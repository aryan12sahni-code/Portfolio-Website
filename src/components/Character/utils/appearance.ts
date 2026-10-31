import * as THREE from "three";

const FACE_SKIN_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);

/**
 * Rebuild the stock avatar into a clearly different person from the
 * redoyanulhaque.me template: South-Asian warm skin, denser dark hair,
 * amber-brown eyes, teal shirt, and a reshaped jaw/cheek silhouette.
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

      if (isFaceSkin && unique.color) {
        // Warm South-Asian bronze — clearly not the template grey/lilac skin.
        unique.color.set("#c9945e");
        unique.roughness = 0.58;
        unique.metalness = 0;
        if (unique.emissive) unique.emissive.set("#4a2410");
        unique.emissiveIntensity = 0.07;
        unique.needsUpdate = true;
      }

      if (isBody && unique.color) {
        // Deep teal shirt instead of the reference dark/purple top.
        unique.color.set("#0f3d3a");
        unique.roughness = 0.72;
        unique.metalness = 0.05;
        if (unique.emissive) unique.emissive.set("#0a5c55");
        unique.emissiveIntensity = 0.08;
        unique.needsUpdate = true;
      }

      if (isHair && unique.color) {
        // Dense near-black hair with a faint teal sheen under key lights.
        unique.color.set("#0a0806");
        unique.roughness = 0.42;
        unique.metalness = 0.12;
        if (unique.emissive) unique.emissive.set("#0b2e2a");
        unique.emissiveIntensity = 0.1;
        unique.side = THREE.DoubleSide;
        unique.needsUpdate = true;
      }

      if (isBrows && unique.color) {
        unique.color.set("#0a0705");
        unique.roughness = 0.8;
        unique.needsUpdate = true;
      }

      if (isEyes) {
        // Amber-brown iris response instead of purple/cyan template eyes.
        if (unique.color) unique.color.set("#fff8f0");
        if (unique.emissive) unique.emissive.set("#b45309");
        unique.emissiveIntensity = 0.18;
        unique.roughness = 0.12;
        unique.needsUpdate = true;
      }

      return unique;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);

    // Reshape face silhouette so it no longer matches the stock head.
    if (mesh.name === "Plane007") {
      // Wider cheekbones, slightly shorter face, deeper profile.
      mesh.scale.set(1.12, 0.92, 1.08);
      mesh.position.y -= 0.012;
      if (mesh.morphTargetInfluences) {
        const dict = mesh.morphTargetDictionary || {};
        const setMorph = (key: string, value: number) => {
          if (dict[key] != null) mesh.morphTargetInfluences![dict[key]] = value;
        };
        setMorph("eyeL_60", 0.55);
        setMorph("eyeL_100", 0.2);
        setMorph("eyeR_60", 0.55);
        setMorph("eyeR_100", 0.2);
        setMorph("Key 2", 0.4);
        setMorph("Key 1", 0.18);
        setMorph("mouthSmile", 0.08);
        setMorph("jawOpen", 0.02);
      }
    }

    if (mesh.name === "Ear001") {
      mesh.scale.set(0.92, 0.95, 0.9);
    }

    if (mesh.name === "Neck") {
      mesh.scale.set(1.04, 1, 1.04);
    }

    if (mesh.name === "Eyebrow") {
      // Heavier, slightly lower brows.
      mesh.scale.set(1.18, 1.05, 1);
      mesh.position.y -= 0.004;
    }

    if (mesh.name === "EYEs001" || mesh.name === "EYEs") {
      mesh.scale.multiplyScalar(1.12);
      mesh.position.z += 0.004;
    }

    if (mesh.name === "Hand") {
      // Match hand skin to face warmth if material already cloned above.
    }
  });

  const hair = root.getObjectByName("hair");
  if (hair) {
    hair.visible = true;
    hair.frustumCulled = false;
    // Distinct cut: slight yaw + pitch so silhouette differs from template.
    hair.rotation.y += 0.14;
    hair.rotation.z += 0.04;
    hair.position.y += 0.01;
    hair.position.x -= 0.008;
  }
}
