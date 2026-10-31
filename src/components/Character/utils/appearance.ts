import * as THREE from "three";

const FACE_SKIN_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);

/**
 * Keep the real character face (no procedural head). Differentiate with
 * warmer skin, visible dark hair, brown eyes, teal shirt, and gentle morphs.
 * Never overwrite hair's baked scale.
 */
export function customizeCharacterAppearance(root: THREE.Object3D) {
  // Remove any previous failed custom head from HMR / older builds.
  root.traverse((child) => {
    if (child.name === "customHead" && child.parent) {
      child.parent.remove(child);
    }
  });

  root.traverse((child: any) => {
    if (!child.isMesh && !child.isSkinnedMesh) return;
    const mesh = child as THREE.Mesh;
    mesh.visible = true;

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
      const isPant = name === "pant";

      if (!(isFaceSkin || isHair || isBrows || isEyes || isBody || isPant)) {
        return material;
      }

      const unique = material.clone() as THREE.MeshStandardMaterial;

      if ((isFaceSkin) && unique.color) {
        unique.color.set("#c9956a");
        unique.roughness = 0.55;
        unique.metalness = 0;
        if (unique.emissive) unique.emissive.set("#3a1c0c");
        unique.emissiveIntensity = 0.04;
        unique.needsUpdate = true;
      }

      if (isBody && unique.color) {
        unique.color.set("#123f3c");
        unique.roughness = 0.7;
        unique.metalness = 0.04;
        if (unique.emissive) unique.emissive.set("#0a5c55");
        unique.emissiveIntensity = 0.06;
        unique.needsUpdate = true;
      }

      if (isPant && unique.color) {
        unique.color.set("#1c2228");
        unique.roughness = 0.85;
        unique.needsUpdate = true;
      }

      if (isHair && unique.color) {
        unique.color.set("#15100c");
        unique.roughness = 0.48;
        unique.metalness = 0.06;
        if (unique.emissive) unique.emissive.set("#0a2e2a");
        unique.emissiveIntensity = 0.08;
        unique.side = THREE.DoubleSide;
        unique.needsUpdate = true;
      }

      if (isBrows && unique.color) {
        unique.color.set("#1a120c");
        unique.roughness = 0.8;
        unique.needsUpdate = true;
      }

      if (isEyes) {
        if (unique.color) unique.color.set("#f7fbff");
        if (unique.emissive) unique.emissive.set("#0f766e");
        unique.emissiveIntensity = 0.12;
        unique.roughness = 0.15;
        unique.needsUpdate = true;
      }

      return unique;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);

    if (mesh.name === "Plane007" && mesh.morphTargetInfluences) {
      const dict = mesh.morphTargetDictionary || {};
      const setMorph = (key: string, value: number) => {
        if (dict[key] != null) mesh.morphTargetInfluences![dict[key]] = value;
      };
      // Mild reshape only — keep the real face readable.
      setMorph("eyeL_60", 0.25);
      setMorph("eyeL_100", 0.05);
      setMorph("Key 2", 0.12);
    }

    if (mesh.name === "Eyebrow") {
      mesh.scale.set(1.05, 1, 1);
    }

    if (mesh.name === "EYEs001" || mesh.name === "EYEs") {
      mesh.scale.set(1.04, 1.04, 1.04);
    }
  });

  const hair = root.getObjectByName("hair");
  if (hair) {
    hair.visible = true;
    hair.frustumCulled = false;
  }
}
