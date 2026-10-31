import * as THREE from "three";

const FACE_SKIN_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);

/** Colors sampled from Aryan's portrait */
const SKIN = "#cf978d";
const HAIR = "#0a080c";
const SHIRT = "#0c0c0e";

/**
 * Human face only — restore the stock head/hands, drop any robot/portrait
 * overlays, and tint materials to match the portrait (skin, hair, black shirt).
 */
export function customizeCharacterAppearance(root: THREE.Object3D) {
  ["customHead", "portraitFace", "robotHead", "robotHandL", "robotHandR"].forEach(
    (name) => {
      const old = root.getObjectByName(name);
      old?.parent?.remove(old);
    }
  );

  root.traverse((child: any) => {
    if (!child.isMesh && !child.isSkinnedMesh) return;
    const mesh = child as THREE.Mesh;
    mesh.visible = true;

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    const nextMaterials = materials.map((mat) => {
      if (!mat) return mat;
      const material = (mat as THREE.MeshStandardMaterial).clone();
      const name = (mesh.name || "").toLowerCase();
      const matName = (material.name || "").toLowerCase();

      const isFaceSkin = FACE_SKIN_MESHES.has(mesh.name);
      const isHair = name === "hair" || matName.includes("030");
      const isBrows = name === "eyebrow" || matName.includes("014");
      const isEyes = name.startsWith("eyes") || matName.includes("eyes");
      const isBody = name === "bodyshirt";
      const isPant = name === "pant";
      const isNeck = name === "neck";
      const isHand = name === "hand";

      if (!(isFaceSkin || isHair || isBrows || isEyes || isBody || isPant || isNeck || isHand)) {
        return material;
      }

      if ((isFaceSkin || isNeck || isHand) && material.color) {
        material.color.set(SKIN);
        material.roughness = 0.55;
        material.metalness = 0;
        if (material.emissive) material.emissive.set("#3a1810");
        material.emissiveIntensity = 0.04;
        material.needsUpdate = true;
      }

      if (isBody && material.color) {
        material.color.set(SHIRT);
        material.roughness = 0.75;
        material.metalness = 0.05;
        if (material.emissive) material.emissive.set("#111111");
        material.emissiveIntensity = 0.02;
        material.needsUpdate = true;
      }

      if (isPant && material.color) {
        material.color.set("#15181c");
        material.roughness = 0.85;
        material.needsUpdate = true;
      }

      if (isHair && material.color) {
        material.color.set(HAIR);
        material.roughness = 0.48;
        material.metalness = 0.05;
        if (material.emissive) material.emissive.set("#0a1a18");
        material.emissiveIntensity = 0.05;
        material.side = THREE.DoubleSide;
        material.needsUpdate = true;
      }

      if (isBrows && material.color) {
        material.color.set("#1a1210");
        material.roughness = 0.8;
        material.needsUpdate = true;
      }

      if (isEyes) {
        if (material.color) material.color.set("#fff8f0");
        if (material.emissive) material.emissive.set("#3b2212");
        material.emissiveIntensity = 0.08;
        material.roughness = 0.15;
        material.needsUpdate = true;
      }

      return material;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);
  });

  const hair = root.getObjectByName("hair");
  if (hair) {
    hair.visible = true;
    hair.frustumCulled = false;
  }
}
