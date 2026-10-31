import * as THREE from "three";

const FACE_SKIN_MESHES = new Set(["Ear001", "Neck", "Plane007", "Hand"]);
const HIDE_FOR_PORTRAIT = new Set([
  "Plane007",
  "Ear001",
  "Eyebrow",
  "EYEs001",
  "EYEs",
  "hair",
  "Face002",
]);

/** Colors sampled from Aryan's portrait */
const SKIN = "#cf978d";
const HAIR = "#0a080c";
const SHIRT = "#0c0c0e";

/**
 * Match the avatar to Aryan's photo: black shirt, sampled skin tone,
 * and a circular portrait face on the head bone (stock face hidden).
 */
export function customizeCharacterAppearance(root: THREE.Object3D) {
  root.traverse((child) => {
    if (child.name === "customHead" || child.name === "portraitFace") {
      child.parent?.remove(child);
    }
  });

  root.traverse((child: any) => {
    if (!child.isMesh && !child.isSkinnedMesh) return;
    const mesh = child as THREE.Mesh;
    const name = mesh.name || "";

    if (HIDE_FOR_PORTRAIT.has(name)) {
      mesh.visible = false;
      return;
    }

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    const nextMaterials = materials.map((mat) => {
      if (!mat) return mat;
      const material = (mat as THREE.MeshStandardMaterial).clone();
      const matName = (material.name || "").toLowerCase();
      const lower = name.toLowerCase();

      const isFaceSkin = FACE_SKIN_MESHES.has(name);
      const isHair = lower === "hair" || matName.includes("030");
      const isBrows = lower === "eyebrow" || matName.includes("014");
      const isEyes = lower.startsWith("eyes") || matName.includes("eyes");
      const isBody = lower === "bodyshirt";
      const isPant = lower === "pant";
      const isHand = lower === "hand";
      const isNeck = lower === "neck";

      if (isHair || isBrows || isEyes) {
        mesh.visible = false;
        return material;
      }

      if ((isFaceSkin || isHand || isNeck) && material.color) {
        // Neck/hands still show beside the portrait — match sampled skin.
        material.color.set(SKIN);
        material.roughness = 0.58;
        material.metalness = 0;
        if (material.emissive) material.emissive.set("#3a1810");
        material.emissiveIntensity = 0.04;
        material.needsUpdate = true;
      }

      if (isBody && material.color) {
        // Black collared shirt like the portrait.
        material.color.set(SHIRT);
        material.roughness = 0.78;
        material.metalness = 0.05;
        if (material.emissive) material.emissive.set("#111111");
        material.emissiveIntensity = 0.02;
        material.needsUpdate = true;
      }

      if (isPant && material.color) {
        material.color.set("#15181c");
        material.roughness = 0.9;
        material.needsUpdate = true;
      }

      return material;
    });

    mesh.material = Array.isArray(mesh.material)
      ? (nextMaterials as THREE.Material[])
      : (nextMaterials[0] as THREE.Material);
  });

  attachPortraitFace(root);
}

function attachPortraitFace(root: THREE.Object3D) {
  const headBone =
    root.getObjectByName("spine006") ||
    root.getObjectByName("spine.006") ||
    root.getObjectByName("spine005");
  if (!headBone) return;

  const stockFace =
    root.getObjectByName("Plane007") || root.getObjectByName("Plane.007");
  let radius = 0.35;
  if (stockFace) {
    const wasVisible = stockFace.visible;
    stockFace.visible = true;
    const box = new THREE.Box3().setFromObject(stockFace);
    const size = new THREE.Vector3();
    box.getSize(size);
    stockFace.visible = wasVisible;
    radius = Math.max(size.x, size.y) * 0.42;
    radius = Math.min(Math.max(radius, 0.15), 1.4);
  }

  const loader = new THREE.TextureLoader();
  loader.load(
    "/images/aryan-face-circle.png",
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;

      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.55,
        metalness: 0,
        side: THREE.DoubleSide,
        depthWrite: true,
      });

      const geo = new THREE.CircleGeometry(1, 64);
      const portrait = new THREE.Mesh(geo, mat);
      portrait.name = "portraitFace";
      portrait.scale.setScalar(radius);
      // Sit where the face is, facing forward.
      portrait.position.set(0, 0.05, 0.28);
      portrait.rotation.set(0, 0, 0);

      // Soft rim disc behind the photo for depth.
      const rim = new THREE.Mesh(
        new THREE.CircleGeometry(1.06, 64),
        new THREE.MeshStandardMaterial({
          color: SKIN,
          roughness: 0.7,
          metalness: 0,
          side: THREE.BackSide,
        })
      );
      rim.position.z = -0.02;
      portrait.add(rim);

      // Short black hair cap behind/above the portrait.
      const hair = new THREE.Mesh(
        new THREE.SphereGeometry(1.05, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
        new THREE.MeshStandardMaterial({
          color: HAIR,
          roughness: 0.5,
          metalness: 0.05,
          side: THREE.DoubleSide,
        })
      );
      hair.position.set(0.05, 0.35, -0.15);
      hair.scale.set(1.05, 1.15, 1.1);
      portrait.add(hair);

      const existing = headBone.getObjectByName("portraitFace");
      if (existing) headBone.remove(existing);
      headBone.add(portrait);
    },
    undefined,
    () => {
      // If texture fails, leave body matched; stock face stays hidden.
      console.warn("Could not load portrait face texture");
    }
  );
}
