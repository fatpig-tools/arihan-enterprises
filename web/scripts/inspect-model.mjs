import { NodeIO, getBounds } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.decoder": MeshoptDecoder });
for (const f of process.argv.slice(2)) {
  const doc = await io.read(f);
  const root = doc.getRoot();
  const scene = root.getDefaultScene() ?? root.listScenes()[0];
  const b = getBounds(scene);
  const size = b.max.map((v, i) => +(v - b.min[i]).toFixed(2));
  const mats = root.listMaterials().map((m) => `${m.getName()}:${m.getBaseColorFactor().map((x) => x.toFixed(2)).join(",")}${m.getBaseColorTexture() ? "+tex" : ""}`);
  console.log(f.split("/").pop(), "size", size, "min", b.min.map((v) => +v.toFixed(2)), "meshes", root.listMeshes().length, "anims", root.listAnimations().length);
  console.log("  materials:", mats.slice(0, 12).join(" | "));
  console.log("  nodes:", root.listNodes().map((n) => n.getName()).filter(Boolean).slice(0, 25).join(", "));
}
