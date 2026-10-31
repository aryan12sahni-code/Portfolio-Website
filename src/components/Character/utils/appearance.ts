import * as THREE from "three";

const FACE_SKIN_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);

/**
 * Restyle face materials only. Do not touch hair scale/position — the mesh
 * ships with a large baked scale and any overwrite makes hair look uneven.
 */
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

      const isFaceSkin = FACE_SKIN_MESHES.has(mesh.name);
      const isHair = name === "hair" || matName.includes("030");
      const isBrows = name === "eyebrow" || matName.includes("014");
      const isEyes = name.startsWith("eyes") || matName.includes("eyes");

      if (!(isFaceSkin || isHair || isBrows || isEyes)) return material;

      const unique = material.clone() as THREE.MeshStandardMaterial;

      if (isFaceSkin && unique.color) {
        unique.color.set("#c9956f");
        unique.roughness = 0.48;
        unique.metalness = 0;
        unique.needsUpdate = true;
      }

      if (isHair && unique.color) {
        // Keep hair on its original geometry; only recolor so it stays even.
        unique.color.set("#2b1a12");
        unique.roughness = 0.62;
        unique.metalness = 0.02;
        unique.side = THREE.DoubleSide;
        unique.needsUpdate = true;
      }

      if (isBrows && unique.color) {
        unique.color.set("#24160f");
        unique.roughness = 0.7;
        unique.needsUpdate = true;
      }

      if (isEyes) {
        if (unique.color) unique.color.set("#eef5ff");
        if (unique.emissive) unique.emissive.set("#1b3a66");
        unique.emissiveIntensity = 0.18;
        unique.roughness = 0.12;
        unique.needsUpdate = true;
      }

      return unique;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);

    if (mesh.name === "Plane007" && mesh.morphTargetInfluences) {
      const dict = mesh.morphTargetDictionary || {};
      if (dict.eyeL_60 != null) mesh.morphTargetInfluences[dict.eyeL_60] = 0.28;
      if (dict["Key 2"] != null) mesh.morphTargetInfluences[dict["Key 2"]] = 0.15;
    }
  });

  // Ensure hair stays visible without distorting its baked transform.
  const hair = root.getObjectByName("hair");
  if (hair) {
    hair.visible = true;
    hair.frustumCulled = false;
  }
}
