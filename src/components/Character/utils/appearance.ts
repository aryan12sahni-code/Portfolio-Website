import * as THREE from "three";

const FACE_SKIN_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);

/**
 * Make the stock avatar read as a different person: warmer skin, fuller
 * visible hair, reshaped face proportions, and teal-tinted lighting response.
 * Never overwrite hair's baked scale — only materials + gentle local offsets.
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
      const isBody = name === "bodyshirt";

      if (!(isFaceSkin || isHair || isBrows || isEyes || isBody)) return material;

      const unique = material.clone() as THREE.MeshStandardMaterial;

      if ((isFaceSkin || isBody) && unique.color) {
        // Distinct warmer bronze skin vs template grey / reference look.
        unique.color.set("#b88862");
        unique.roughness = 0.52;
        unique.metalness = 0;
        if (unique.emissive) unique.emissive.set("#3a1c0c");
        unique.emissiveIntensity = 0.05;
        unique.needsUpdate = true;
      }

      if (isHair && unique.color) {
        // Clearly visible dark espresso hair (not purple, not invisible black).
        unique.color.set("#1c120c");
        unique.roughness = 0.48;
        unique.metalness = 0.08;
        if (unique.emissive) unique.emissive.set("#0d3d38");
        unique.emissiveIntensity = 0.12;
        unique.side = THREE.DoubleSide;
        unique.needsUpdate = true;
      }

      if (isBrows && unique.color) {
        unique.color.set("#140e0a");
        unique.roughness = 0.75;
        unique.needsUpdate = true;
      }

      if (isEyes) {
        if (unique.color) unique.color.set("#f7fbff");
        if (unique.emissive) unique.emissive.set("#0f766e");
        unique.emissiveIntensity = 0.2;
        unique.roughness = 0.1;
        unique.needsUpdate = true;
      }

      return unique;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);

    // Reshape face silhouette without touching hair transforms.
    if (mesh.name === "Plane007") {
      mesh.scale.set(1.06, 0.97, 1.04);
      if (mesh.morphTargetInfluences) {
        const dict = mesh.morphTargetDictionary || {};
        if (dict.eyeL_60 != null) mesh.morphTargetInfluences[dict.eyeL_60] = 0.4;
        if (dict.eyeL_100 != null) mesh.morphTargetInfluences[dict.eyeL_100] = 0.1;
        if (dict["Key 2"] != null) mesh.morphTargetInfluences[dict["Key 2"]] = 0.25;
      }
    }

    if (mesh.name === "Ear001") {
      mesh.scale.multiplyScalar(1.05);
    }

    if (mesh.name === "Eyebrow") {
      mesh.scale.set(1.1, 0.95, 1);
      mesh.position.y += 0.005;
    }

    if (mesh.name === "EYEs001") {
      mesh.scale.multiplyScalar(1.08);
    }
  });

  const hair = root.getObjectByName("hair");
  if (hair) {
    hair.visible = true;
    hair.frustumCulled = false;
    // Tiny yaw so the cut reads differently, without breaking baked scale.
    hair.rotation.y += 0.08;
  }
}
