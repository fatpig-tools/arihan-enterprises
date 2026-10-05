"use client";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type Machine = {
  url: string;
  /** Nodes painted in the accent colour (three.js names: spaces become underscores). */
  accentNodes?: string[];
  /** Nodes that tip together about their rear-bottom edge (a dump body). */
  tipNodes?: string[];
  /** Node used to tell front from rear when tipping. */
  frontNode?: string;
};

const CLAY = new THREE.MeshStandardMaterial({ color: "#d8d2c6", roughness: 0.62, metalness: 0.08 });
const DARK = new THREE.MeshStandardMaterial({ color: "#2a2f35", roughness: 0.8, metalness: 0.1 });
const SIGNAL = new THREE.MeshStandardMaterial({ color: "#f2b705", roughness: 0.4, metalness: 0.15 });
const LENGTH = 7.2; // every machine is scaled to the same footprint

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Loads a model and re-skins it as a studio clay with one accent part, which also hides brand decals. */
function useClayModel({ url, accentNodes = [], tipNodes = [], frontNode }: Machine) {
  const { scene } = useGLTF(url);
  return useMemo(() => {
    const root = scene.clone(true);
    const accents = accentNodes.map((n) => root.getObjectByName(n)).filter(Boolean) as THREE.Object3D[];
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const original = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;
      const darkBase = !original.map && original.color && original.color.getHSL({ h: 0, s: 0, l: 0 }).l < 0.12;
      let insideAccent = accents.includes(o);
      o.traverseAncestors((a) => {
        if (accents.includes(a)) insideAccent = true;
      });
      mesh.material = insideAccent ? SIGNAL : darkBase ? DARK : CLAY;
      mesh.castShadow = true;
    });

    // Normalise: same length, centred, standing on y = 0, long axis along x.
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const longX = size.x >= size.z;
    const wrapper = new THREE.Group();
    const inner = new THREE.Group();
    inner.add(root);
    if (!longX) inner.rotation.y = Math.PI / 2;
    wrapper.add(inner);
    wrapper.updateMatrixWorld(true);
    const box2 = new THREE.Box3().setFromObject(wrapper);
    const s = LENGTH / Math.max(size.x, size.z);
    const centre = box2.getCenter(new THREE.Vector3());
    inner.position.set(-centre.x, -box2.min.y, -centre.z);
    wrapper.scale.setScalar(s);

    // Tipping body: re-parent onto a pivot at its rear-bottom edge and tip it
    // about the world axis across the vehicle (length runs along world x).
    let tip: { pivot: THREE.Group; axis: THREE.Vector3; sign: number } | null = null;
    const parts = tipNodes.map((n) => root.getObjectByName(n)).filter(Boolean) as THREE.Object3D[];
    const body = parts[0];
    const front = frontNode ? root.getObjectByName(frontNode) : undefined;
    if (body && body.parent) {
      wrapper.updateMatrixWorld(true);
      const bodyBox = new THREE.Box3();
      parts.forEach((part) => bodyBox.expandByObject(part));
      const bodyCentre = bodyBox.getCenter(new THREE.Vector3());
      const frontX = front ? new THREE.Box3().setFromObject(front).getCenter(new THREE.Vector3()).x : bodyCentre.x - 1;
      const rearIsMax = frontX < bodyCentre.x;
      const hinge = new THREE.Vector3(rearIsMax ? bodyBox.max.x : bodyBox.min.x, bodyBox.min.y, bodyCentre.z);
      const parent = body.parent;
      const pivot = new THREE.Group();
      parent.add(pivot);
      pivot.position.copy(parent.worldToLocal(hinge.clone()));
      pivot.updateMatrixWorld(true);
      parts.forEach((part) => pivot.attach(part));
      const parentRotation = new THREE.Quaternion();
      parent.getWorldQuaternion(parentRotation);
      const axis = new THREE.Vector3(0, 0, 1).applyQuaternion(parentRotation.invert()).normalize();
      // Try one direction: the right one keeps the body above its hinge.
      pivot.quaternion.setFromAxisAngle(axis, 0.4);
      pivot.updateMatrixWorld(true);
      const lowest = new THREE.Box3().setFromObject(pivot).min.y;
      pivot.quaternion.identity();
      pivot.updateMatrixWorld(true);
      tip = { pivot, axis, sign: lowest < hinge.y - 0.05 ? -1 : 1 };
    }
    return { object: wrapper, tip };
  }, [scene, accentNodes, tipNodes, frontNode]);
}

function MachineOnStage({ machine, index, count, progress }: { machine: Machine; index: number; count: number; progress: RefObject<number> }) {
  const { object, tip } = useClayModel(machine);
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progress.current * count; // 0..count
    const local = p - index; // 0..1 while this machine is on stage
    const enter = index === 0 ? 1 : smooth(clamp01(local * 6 + 0.5));
    const leave = index === count - 1 ? 1 : 1 - smooth(clamp01((local - 0.88) * 6));
    const shown = Math.min(enter, leave);
    const g = group.current;
    if (!g) return;
    g.visible = shown > 0.001;
    g.scale.setScalar(0.82 + 0.18 * shown);
    g.position.y = (1 - shown) * -0.6;
    g.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) m.visible = shown > 0.02;
    });
    if (tip) {
      const tilt = smooth(clamp01((local - 0.3) / 0.35)) * (1 - smooth(clamp01((local - 0.75) / 0.2)));
      tip.pivot.quaternion.setFromAxisAngle(tip.axis, tip.sign * tilt * 0.75);
    }
  });

  return (
    <group ref={group}>
      <primitive object={object} />
    </group>
  );
}

function Turntable({ progress, count }: { progress: RefObject<number>; count: number }) {
  const spin = useRef<THREE.Group>(null);
  const ticks = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2;
      const r0 = i % 10 === 0 ? 5.55 : 5.7;
      pts.push(Math.cos(a) * r0, 0.012, Math.sin(a) * r0, Math.cos(a) * 5.85, 0.012, Math.sin(a) * 5.85);
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (spin.current) spin.current.rotation.y = -0.6 + progress.current * Math.PI * 2 * count * 0.55 + state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={spin}>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[5.9, 96]} />
        <meshStandardMaterial color="#1b2026" roughness={0.9} />
      </mesh>
      <lineSegments geometry={ticks}>
        <lineBasicMaterial color="#8fa9bf" transparent opacity={0.35} />
      </lineSegments>
      <mesh rotation-x={-Math.PI / 2} position-y={0.014}>
        <ringGeometry args={[5.86, 5.9, 128]} />
        <meshBasicMaterial color="#f2b705" />
      </mesh>
    </group>
  );
}

function Rig({ progress }: { progress: RefObject<number> }) {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer }) => {
    const narrow = size.width < size.height;
    const p = progress.current;
    const dist = narrow ? 25 : 17;
    const angle = 0.75 + pointer.x * 0.06;
    camera.position.lerp(new THREE.Vector3(Math.sin(angle) * dist, 4.6 + p * 1.2 - pointer.y * 0.3, Math.cos(angle) * dist), 0.08);
    target.lerp(new THREE.Vector3(narrow ? 0.6 : -4.4, narrow ? 6.4 : 1.7, 0), 0.1);
    camera.lookAt(target);
  });
  return null;
}

/** Studio turntable that presents each machine in turn as the page scrolls. */
export default function Showroom({ machines, progress }: { machines: Machine[]; progress: RefObject<number> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [10, 5, 10], fov: 30 }} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={["#111417", 18, 40]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 12, 6]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
        <spotLight position={[-9, 6, -6]} intensity={60} angle={0.5} penumbra={1} color="#f2b705" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.4} position={[0, 8, 2]} scale={[12, 3, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={1.2} position={[-8, 3, 4]} scale={[4, 6, 1]} rotation-y={Math.PI / 3} />
          <Lightformer form="rect" intensity={0.8} color="#f2b705" position={[8, 2, -6]} scale={[3, 5, 1]} rotation-y={-Math.PI / 3} />
        </Environment>
        <Turntable progress={progress} count={machines.length} />
        <group>
          {machines.map((m, i) => (
            <SpinWith key={m.url} progress={progress} count={machines.length}>
              <MachineOnStage machine={m} index={i} count={machines.length} progress={progress} />
            </SpinWith>
          ))}
        </group>
        <ContactShadows position={[0, 0.02, 0]} scale={14} blur={2.6} opacity={0.65} far={6} resolution={512} />
        <Rig progress={progress} />
      </Canvas>
    </div>
  );
}

/** Rotates its children with the turntable. */
function SpinWith({ children, progress, count }: { children: React.ReactNode; progress: RefObject<number>; count: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (g.current) g.current.rotation.y = -0.6 + progress.current * Math.PI * 2 * count * 0.55 + state.clock.elapsedTime * 0.03;
  });
  return <group ref={g}>{children}</group>;
}
