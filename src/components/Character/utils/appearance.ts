import * as THREE from "three";

const FACE_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);

/** Subtle face makeover so the avatar isn't identical to the template. */
export function customizeCharacterAppearance(root: THREE.Object3D) {
  root.traverse((child: any) => {
    if (!child.isMesh && !child.isSkinnedMesh) return;
    const mesh = child as THREE.Mesh;
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    const nextMaterials = materials.map((mat) => {
      if (!mat) return mat;
      const material = mat as THREE.MeshStandardMaterial;
      const name = (mesh.name || "").toLowerCase();
      const matName = (material.name || "").toLowerCase();

      const isFaceSkin = FACE_MESHES.has(mesh.name);
      const isHair = name === "hair" || matName.includes("030");
      const isBrows = name === "eyebrow" || matName.includes("014");
      const isEyes = name.startsWith("eyes") || matName.includes("eyes");

      if (!(isFaceSkin || isHair || isBrows || isEyes)) return material;

      const unique = material.clone() as THREE.MeshStandardMaterial;

      if (isFaceSkin && unique.color) {
        // Warmer, slightly deeper skin than the template's cool grey.
        unique.color.set("#d7b08c");
        unique.roughness = Math.min(0.55, (unique.roughness ?? 0.35) + 0.08);
        unique.metalness = 0;
        unique.needsUpdate = true;
      }

      if (isHair && unique.color) {
        // Soft charcoal-brown instead of pure black.
        unique.color.set("#1a1410");
        unique.roughness = 0.72;
        unique.needsUpdate = true;
      }

      if (isBrows && unique.color) {
        unique.color.set("#2a2118");
        unique.roughness = 0.65;
        unique.needsUpdate = true;
      }

      if (isEyes) {
        if (unique.color) unique.color.set("#f4f8ff");
        if (unique.emissive) unique.emissive.set("#102038");
        unique.emissiveIntensity = 0.15;
        unique.roughness = 0.18;
        unique.needsUpdate = true;
      }

      return unique;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);

    // Soften the resting expression on the face morph mesh.
    if (mesh.name === "Plane007" && mesh.morphTargetInfluences) {
      const dict = mesh.morphTargetDictionary || {};
      if (dict.eyeL_60 != null) mesh.morphTargetInfluences[dict.eyeL_60] = 0.22;
      if (dict["Key 2"] != null) mesh.morphTargetInfluences[dict["Key 2"]] = 0.12;
    }
  });

  // Slight head proportions tweak for a different silhouette.
  const face = root.getObjectByName("Face002");
  if (face) {
    face.scale.set(1.02, 1.015, 1.03);
  }
  const hair = root.getObjectByName("hair");
  if (hair) {
    hair.scale.set(1.04, 1.03, 1.02);
    hair.position.y += 0.01;
  }
}
