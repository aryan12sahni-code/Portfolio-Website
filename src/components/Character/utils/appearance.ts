import * as THREE from "three";

const FACE_SKIN_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);

/**
 * Restyle the stock avatar so the face reads differently and hair stays visible.
 * Important: the hair mesh ships with a large baked scale (~11). Never overwrite
 * that with a ~1.0 scale or the hair disappears.
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
        // Clearer skin shift vs the template's cool grey.
        unique.color.set("#c9956f");
        unique.roughness = 0.48;
        unique.metalness = 0;
        if (unique.emissive) unique.emissive.set("#2a1208");
        unique.emissiveIntensity = 0.04;
        unique.needsUpdate = true;
      }

      if (isHair && unique.color) {
        // Visible deep brown (near-black vanishes on the dark stage).
        unique.color.set("#3b2416");
        unique.roughness = 0.55;
        unique.metalness = 0.05;
        if (unique.emissive) unique.emissive.set("#1a0c08");
        unique.emissiveIntensity = 0.08;
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
        unique.emissiveIntensity = 0.22;
        unique.roughness = 0.12;
        unique.needsUpdate = true;
      }

      return unique;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);

    mesh.visible = true;
    mesh.frustumCulled = false;

    // Different resting face: slightly narrower lids / soft smile morph.
    if (mesh.name === "Plane007" && mesh.morphTargetInfluences) {
      const dict = mesh.morphTargetDictionary || {};
      if (dict.eyeL_60 != null) mesh.morphTargetInfluences[dict.eyeL_60] = 0.35;
      if (dict.eyeL_100 != null) mesh.morphTargetInfluences[dict.eyeL_100] = 0.08;
      if (dict["Key 2"] != null) mesh.morphTargetInfluences[dict["Key 2"]] = 0.2;
    }
  });

  const hair = root.getObjectByName("hair");
  if (hair) {
    hair.visible = true;
    // Preserve baked scale; only bump volume a little.
    hair.scale.multiplyScalar(1.12);
    hair.position.y += 0.02;
    hair.position.z += 0.015;
  }

  const brows = root.getObjectByName("Eyebrow");
  if (brows) {
    brows.scale.multiplyScalar(1.08);
  }

  const eyes = root.getObjectByName("EYEs001");
  if (eyes) {
    eyes.scale.multiplyScalar(1.06);
  }

  // Keep body/head skin closer to the new face tone where they share the
  // pale "default" look on neck-adjacent parts only (already handled above).
}
