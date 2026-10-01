"""Renders the scroll-story film: one camera flight across five clay scenes,
with the trailer driving in, the survey line being strung, and the beam lifted."""
import json, math, subprocess, sys
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFilter

SRC = "/Users/ritam/ARIHAN ENTERPRISES/web/public/media/story"
OUT = SRC + "/story.mp4"
W, H, FPS = 1280, 720, 24
BG = (229, 229, 229)
ACCENT = (220, 74, 31)
PREVIEW = len(sys.argv) > 1 and sys.argv[1] == "preview"

scene = {n: Image.open(f"{SRC}/{n}.jpg").convert("RGB") for n in range(1, 6)}
SW, SH = scene[1].size

def poly_mask(points, blur=0):
    m = Image.new("L", (SW, SH), 0)
    ImageDraw.Draw(m).polygon(points, fill=255)
    return m.filter(ImageFilter.GaussianBlur(blur)) if blur else m

def clean_plate(img, mask, grow=13, radius=9):
    m = cv2.dilate(np.array(mask), np.ones((grow, grow), np.uint8))
    out = cv2.inpaint(cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR), m, radius, cv2.INPAINT_TELEA)
    return Image.fromarray(cv2.cvtColor(out, cv2.COLOR_BGR2RGB))

# --- Scene 2: trailer + excavator as a moving layer -------------------------
truck_poly = [(545,395),(565,368),(640,333),(727,350),(742,400),(744,470),(790,478),(850,448),(905,452),(1000,441),(1100,468),(1152,500),(1160,560),(1142,600),(1235,625),(1250,598),(1282,603),(1287,737),(1257,757),(1190,794),(1150,787),(1085,767),(960,707),(850,657),(760,612),(700,597),(640,548),(585,542),(548,507)]
truck_mask = poly_mask(truck_poly, 1.5)
truck = scene[2].copy(); truck.putalpha(truck_mask)
plate2 = clean_plate(scene[2], poly_mask(truck_poly), grow=25, radius=12)
ROAD = np.array([1.0, 0.375]); ROAD /= np.linalg.norm(ROAD)

# --- Scene 5: hook, slings and beam as a moving layer -----------------------
rig_poly = [(650,283),(706,283),(706,352),(812,442),(810,482),(542,524),(532,482),(650,352)]
beam_poly = [(533,478),(803,434),(810,472),(545,520)]
rig = np.array(poly_mask(rig_poly)).astype(np.float32) / 255
arr5 = np.array(scene[5]).astype(np.float32)
local_bg = np.median(arr5[290:340, 540:620].reshape(-1, 3), axis=0)
key = np.clip((np.abs(arr5 - local_bg).max(axis=2) - 7) / 16, 0, 1)
alpha5 = np.maximum(key * rig, np.array(poly_mask(beam_poly)).astype(np.float32) / 255 * 0.999)
alpha5 = cv2.GaussianBlur(alpha5, (3, 3), 0)
beam = scene[5].copy(); beam.putalpha(Image.fromarray((alpha5 * 255).astype(np.uint8)))
plate5 = clean_plate(scene[5], poly_mask(rig_poly), grow=9, radius=7)
LIFT = 175  # px the load starts below its final position

# --- Scene 1: survey string -------------------------------------------------
string_pts = [(795,410),(1310,625),(965,800),(440,565),(795,410)]
seg_len = [math.dist(string_pts[i], string_pts[i+1]) for i in range(4)]

def draw_string(img, t):
    if t <= 0: return img
    img = img.copy(); d = ImageDraw.Draw(img)
    remaining = sum(seg_len) * t
    for i in range(4):
        if remaining <= 0: break
        a, b = string_pts[i], string_pts[i+1]
        f = min(1, remaining / seg_len[i])
        end = (a[0] + (b[0]-a[0])*f, a[1] + (b[1]-a[1])*f)
        d.line([a, end], fill=ACCENT, width=5)
        d.ellipse([a[0]-7, a[1]-7, a[0]+7, a[1]+7], fill=ACCENT)
        remaining -= seg_len[i]
    return img

# --- World ------------------------------------------------------------------
WW, WH = 9400, 5800
centre = {5: (4700, 2900), 1: (2450, 1640), 2: (6950, 1640), 3: (6950, 4160), 4: (2450, 4160)}
origin = {n: (c[0] - SW // 2, c[1] - SH // 2) for n, c in centre.items()}
feather = Image.new("L", (SW, SH), 0)
ImageDraw.Draw(feather).rectangle([110, 90, SW - 110, SH - 90], fill=255)
feather = feather.filter(ImageFilter.GaussianBlur(60))

def build_world(string_t, truck_off, lift_dy):
    world = Image.new("RGB", (WW, WH), BG)
    s1 = draw_string(scene[1], string_t)
    s2 = plate2.copy()
    off = (ROAD * truck_off).round().astype(int)
    s2.paste(truck, (int(off[0]), int(off[1])), truck)
    s5 = plate5.copy()
    if lift_dy > 0:
        d = ImageDraw.Draw(s5)
        for x in (668, 686):
            d.line([(x, 280), (x, 290 + lift_dy)], fill=(138, 138, 138), width=2)
    s5.paste(beam, (0, int(lift_dy)), beam)
    for n, img in ((1, s1), (2, s2), (3, scene[3]), (4, scene[4]), (5, s5)):
        world.paste(img, origin[n], feather)
    return world

def smooth(t): t = min(max(t, 0), 1); return t * t * t * (t * (6 * t - 15) + 10)
def lerp(a, b, t): return a + (b - a) * t

# Camera stops: (scene, focus point in scene px, view width). The view is shifted
# left of the focus so the scene sits on the right, clear of the page copy.
def stop(n, focus=(960, 540), vw=2520, shift=0.1):
    return (origin[n][0] + focus[0] - shift * vw, origin[n][1] + focus[1], vw)

stops = [stop(5, (1040, 470), 2080, 0.2), stop(1), stop(2), stop(3), stop(4), stop(5, (940, 520), 2450)]
hold = [34, 44, 46, 38, 38, 56]
travel = [38, 38, 38, 38, 42]

frames = []   # (cx, cy, vw, string_t, truck_off, lift_dy)
marks = []    # per stop: (first frame of hold, last frame of hold)
for i, s in enumerate(stops):
    start = len(frames)
    for f in range(hold[i]):
        u = f / max(hold[i] - 1, 1)
        vw = s[2] * (1 - 0.05 * u)                      # slow push in
        cx = s[0] + 26 * (u - 0.5); cy = s[1] - 14 * (u - 0.5)
        string_t = smooth(u * 1.25) if i == 1 else (1 if i > 1 else 0)
        truck_off = 250 * (1 - smooth(0.45 + u * 0.75)) if i == 2 else (0 if i > 2 else 250)
        lift = LIFT * (1 - smooth(u * 1.2)) if i == 5 else LIFT
        frames.append((cx, cy, vw, string_t, truck_off, lift))
    marks.append((start, len(frames) - 1))
    if i < len(travel):
        a = frames[-1]; nxt = stops[i + 1]
        b = (nxt[0] - 13, nxt[1] + 7, nxt[2])
        for f in range(1, travel[i] + 1):
            u = smooth(f / (travel[i] + 1))
            vw = lerp(a[2], b[2], u) + 950 * math.sin(math.pi * u) ** 1.4   # pull back mid-flight
            truck_off = 250 * (1 - smooth(0.45 * f / travel[i])) if i == 1 else (0 if i > 1 else 250)
            frames.append((lerp(a[0], b[0], u), lerp(a[1], b[1], u), vw, 1 if i >= 1 else 0, truck_off, LIFT))

total = len(frames)
info = {"fps": FPS, "frames": total, "duration": total / FPS,
        "stops": [{"start": a / FPS, "end": b / FPS} for a, b in marks]}
print(json.dumps(info))

def render(i):
    cx, cy, vw, string_t, truck_off, lift = frames[i]
    key = (round(string_t, 3), round(truck_off), round(lift))
    if render.key != key:
        render.world = build_world(string_t, truck_off, lift); render.key = key
    vh = vw * H / W
    box = (cx - vw / 2, cy - vh / 2, cx + vw / 2, cy + vh / 2)
    return render.world.resize((W, H), Image.LANCZOS, box=box, reducing_gap=2.0)
render.key = None

if PREVIEW:
    picks = [0, marks[1][0], marks[1][1], marks[2][0], marks[2][1], marks[3][1], marks[4][1], marks[5][0], total - 1,
             (marks[0][1] + marks[1][0]) // 2, marks[2][0] - 12, (marks[4][1] + marks[5][0]) // 2]
    sheet = Image.new("RGB", (W // 2 * 3, H // 2 * 4))
    for k, i in enumerate(picks):
        sheet.paste(render(i).resize((W // 2, H // 2)), ((k % 3) * W // 2, (k // 3) * H // 2))
    sheet.save("story-preview.jpg", quality=85)
    sys.exit()

ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
                       "-i", "-", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-g", "3", "-bf", "0",
                       "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT], stdin=subprocess.PIPE)
for i in range(total):
    ff.stdin.write(render(i).tobytes())
ff.stdin.close(); ff.wait()
render(0).save(SRC + "/story-poster.jpg", quality=86)
