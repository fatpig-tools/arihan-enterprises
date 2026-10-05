// Generates the site's Lottie icon animations as JSON (shape layers only).
// Run: node scripts/make-lottie.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("../src/lottie/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const AMBER = [0.949, 0.718, 0.02, 1];
const GREY = [0.561, 0.663, 0.749, 1];
const FR = 30;
const W = 5;

const arr = (v) => (Array.isArray(v) ? v : [v]);
const fixed = (v) => ({ a: 0, k: v });
const EASE = { i: { x: [0.3], y: [1] }, o: { x: [0.6], y: [0] } };
const LINEAR = { i: { x: [1], y: [1] }, o: { x: [0], y: [0] } };
/** keyframes: [[frame, value], ...] */
const anim = (frames, ease = EASE) => ({
  a: 1,
  k: frames.map(([t, s], i) => (i < frames.length - 1 ? { t, s: arr(s), ...ease } : { t, s: arr(s) })),
});

const rect = (w, h, x = 0, y = 0, r = 0) => ({ ty: "rc", d: 1, s: fixed([w, h]), p: fixed([x, y]), r: fixed(r) });
const ellipse = (w, h, x = 0, y = 0) => ({ ty: "el", d: 1, s: fixed([w, h]), p: fixed([x, y]) });
const path = (v, closed = false) => ({
  ty: "sh",
  ks: fixed({ i: v.map(() => [0, 0]), o: v.map(() => [0, 0]), v, c: closed }),
});
const stroke = (c = GREY, w = W) => ({ ty: "st", c: fixed(c), o: fixed(100), w: fixed(w), lc: 2, lj: 2 });
const fill = (c = AMBER) => ({ ty: "fl", c: fixed(c), o: fixed(100), r: 1 });
const trim = (s, e) => ({ ty: "tm", s, e, o: fixed(0), m: 1 });
const tr = (o = {}) => ({
  ty: "tr",
  p: o.p ?? fixed([0, 0]),
  a: o.a ?? fixed([0, 0]),
  s: o.s ?? fixed([100, 100]),
  r: o.r ?? fixed(0),
  o: o.o ?? fixed(100),
});
const group = (items, transform) => ({ ty: "gr", it: [...items, tr(transform)] });

let ind = 0;
/** Layer centred on the 120x120 canvas; `anchor` shifts the transform origin. */
const layer = (nm, shapes, o = {}, op = 90) => {
  const [ax, ay] = o.anchor ?? [0, 0];
  return {
    ddd: 0,
    ind: ++ind,
    ty: 4,
    nm,
    sr: 1,
    ks: {
      o: o.o ?? fixed(100),
      r: o.r ?? fixed(0),
      p: o.p ?? fixed([60 + ax, 60 + ay, 0]),
      a: fixed([ax, ay, 0]),
      s: o.s ?? fixed([100, 100, 100]),
    },
    ao: 0,
    shapes,
    ip: 0,
    op,
    st: 0,
    bm: 0,
  };
};

const save = (name, layers, op = 90) => {
  const doc = { v: "5.9.0", fr: FR, ip: 0, op, w: 120, h: 120, nm: name, ddd: 0, assets: [], layers };
  writeFileSync(new URL(`${name}.json`, OUT), JSON.stringify(doc));
  ind = 0;
};

// 1. Enquiry — speech bubble with typing dots
save("enquiry", [
  ...[-16, 0, 16].map((x, i) =>
    layer(`dot${i}`, [group([ellipse(8, 8, x, -6), fill()])], {
      anchor: [x, -6],
      s: anim([
        [0, [100, 100, 100]],
        [8 + i * 8, [100, 100, 100]],
        [18 + i * 8, [175, 175, 100]],
        [30 + i * 8, [100, 100, 100]],
        [90, [100, 100, 100]],
      ]),
    }),
  ),
  layer("bubble", [
    group([rect(72, 48, 0, -6, 8), stroke()]),
    group([path([[-16, 18], [-24, 34], [-2, 18]]), stroke()]),
  ]),
]);

// 2. Assessment — map pin dropping onto a site
save("assessment", [
  layer("pin", [group([ellipse(30, 30, 0, -16), stroke(AMBER)]), group([path([[-12, -6], [0, 22], [12, -6]]), stroke(AMBER)]), group([ellipse(9, 9, 0, -16), fill()])], {
    p: anim([
      [0, [60, 42, 0]],
      [14, [60, 60, 0]],
      [22, [60, 54, 0]],
      [30, [60, 60, 0]],
      [72, [60, 60, 0]],
      [90, [60, 42, 0]],
    ]),
  }),
  layer("ring", [group([ellipse(46, 14, 0, 30), stroke()])], {
    anchor: [0, 30],
    s: anim([
      [0, [40, 40, 100]],
      [14, [40, 40, 100]],
      [50, [150, 150, 100]],
      [90, [150, 150, 100]],
    ]),
    o: anim([
      [0, 0],
      [14, 100],
      [50, 0],
      [90, 0],
    ]),
  }),
  layer("ground", [group([ellipse(30, 9, 0, 30), stroke()])]),
]);

// 3. Agreement — document signed off with a tick
save("agreement", [
  layer("tick", [
    group([
      path([[-13, 12], [-3, 22], [15, 2]]),
      trim(fixed(0), anim([[0, 0], [12, 0], [36, 100], [80, 100], [90, 0]])),
      stroke(AMBER, 6),
    ]),
  ]),
  layer("doc", [
    group([rect(56, 72, 0, 0, 5), stroke()]),
    group([path([[-16, -20], [16, -20]]), stroke()]),
    group([path([[-16, -8], [6, -8]]), stroke()]),
  ]),
]);

// 4. Mobilise — loaded truck rolling to site
const wheel = (x) =>
  layer(`wheel${x}`, [group([ellipse(18, 18, x, 26), stroke(AMBER)]), group([path([[x - 5, 26], [x + 5, 26]]), stroke(AMBER, 3)])], {
    anchor: [x, 26],
    r: anim([[0, 0], [90, 720]], LINEAR),
  });
save("mobilise", [
  wheel(-22),
  wheel(24),
  layer("body", [group([rect(50, 30, -14, 2, 3), stroke()]), group([path([[11, -6], [28, -6], [38, 6], [38, 17], [11, 17]], true), stroke()])], {
    p: anim([[0, [60, 60, 0]], [22, [60, 58, 0]], [45, [60, 60, 0]], [68, [60, 58, 0]], [90, [60, 60, 0]]]),
  }),
  ...[-10, 4].map((y, i) =>
    layer(`speed${i}`, [group([path([[-54, y], [-44, y]]), stroke(AMBER, 3)])], {
      o: anim([[0, 0], [10 + i * 20, 100], [40 + i * 20, 0], [90, 0]]),
      p: anim([[0, [66, 60, 0]], [10 + i * 20, [66, 60, 0]], [40 + i * 20, [52, 60, 0]], [90, [52, 60, 0]]]),
    }),
  ),
]);

// 5. Report — bars growing against an axis
save("report", [
  ...[
    [-18, 22],
    [2, 38],
    [22, 54],
  ].map(([x, h], i) =>
    layer(`bar${i}`, [group([rect(12, h, x, 28 - h / 2, 1), fill()])], {
      anchor: [x, 28],
      s: anim([
        [0, [100, 0, 100]],
        [6 + i * 8, [100, 0, 100]],
        [30 + i * 8, [100, 100, 100]],
        [78, [100, 100, 100]],
        [90, [100, 0, 100]],
      ]),
    }),
  ),
  layer("axes", [group([path([[-34, -30], [-34, 30], [36, 30]]), stroke()])]),
]);

// 6. Maintenance — turning gear
const teeth = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  return group([path([[Math.cos(a) * 24, Math.sin(a) * 24], [Math.cos(a) * 34, Math.sin(a) * 34]]), stroke(AMBER, 9)]);
});
save("gear", [
  layer("hub", [group([ellipse(14, 14), stroke()])]),
  layer("gear", [group([ellipse(46, 46), stroke(AMBER, 6)]), ...teeth], { r: anim([[0, 0], [90, 90]], LINEAR) }),
]);

// 7. Lifting — hook swinging on its rope
save("hook", [
  layer(
    "hook",
    [
      group([path([[0, -46], [0, -6]]), stroke()]),
      group([rect(18, 14, 0, -2, 3), fill()]),
      group([ellipse(30, 30, 0, 22), trim(fixed(26), fixed(100)), stroke(AMBER, 6)]),
    ],
    {
      anchor: [0, -46],
      r: anim([[0, -9], [22, 9], [45, -9], [68, 9], [90, -9]], { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } }),
    },
  ),
  layer("jib", [group([path([[-34, -46], [34, -46]]), stroke()])]),
]);

// 8. Success — drawn ring and tick, plays once
save(
  "success",
  [
    layer("tick", [group([path([[-18, 2], [-5, 15], [20, -12]]), trim(fixed(0), anim([[18, 0], [40, 100]])), stroke(AMBER, 7)])], {}, 60),
    layer("ring", [group([ellipse(84, 84), trim(fixed(0), anim([[0, 0], [26, 100]])), stroke(GREY, 5)])], {}, 60),
  ],
  60,
);

// 9. Safety — shield with a tick
save("shield", [
  layer("tick", [group([path([[-12, 0], [-3, 9], [14, -9]]), trim(fixed(0), anim([[0, 0], [14, 0], [38, 100], [80, 100], [90, 0]])), stroke(AMBER, 6)])]),
  layer("shield", [group([path([[0, -38], [30, -26], [30, 4], [0, 38], [-30, 4], [-30, -26]], true), stroke()])]),
]);

console.log("Lottie files written to src/lottie");
