import * as THREE from "three";

const HIDE_FACE_PARTS = new Set([
  "Plane007",
  "Ear001",
  "Eyebrow",
  "EYEs001",
  "EYEs",
  "hair",
  "Face002",
]);

/**
 * Replace the stock template face entirely with a custom stylized head
 * parented to the head bone. Body / desk stay; face silhouette becomes new.
 */
export function customizeCharacterAppearance(root: THREE.Object3D) {
  // Recolor shirt / hands / neck so the body matches the new head.
  root.traverse((child: any) => {
    if (!child.isMesh && !child.isSkinnedMesh) return;
    const mesh = child as THREE.Mesh;
    const name = mesh.name || "";

    if (HIDE_FACE_PARTS.has(name)) {
      mesh.visible = false;
      return;
    }

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    const next = materials.map((mat) => {
      if (!mat) return mat;
      const material = (mat as THREE.MeshStandardMaterial).clone();
      const matName = (material.name || "").toLowerCase();
      const lower = name.toLowerCase();

      const isBody = lower === "bodyshirt" || lower.includes("body");
      const isHand = lower === "hand";
      const isNeck = lower === "neck";
      const isPant = lower === "pant";

      if (isBody) {
        material.color?.set("#0d3330");
        material.roughness = 0.7;
        material.metalness = 0.04;
        if (material.emissive) material.emissive.set("#0a4f48");
        material.emissiveIntensity = 0.06;
        material.needsUpdate = true;
      }

      if ((isHand || isNeck) && material.color) {
        material.color.set("#b8794a");
        material.roughness = 0.55;
        material.metalness = 0;
        if (material.emissive) material.emissive.set("#3d1c0c");
        material.emissiveIntensity = 0.04;
        material.needsUpdate = true;
      }

      if (isPant && material.color) {
        material.color.set("#1a1f24");
        material.roughness = 0.85;
        material.needsUpdate = true;
      }

      // Catch hair/eye mats if mesh name differs after sanitize.
      if (matName.includes("030") || lower === "hair") {
        mesh.visible = false;
      }
      if (matName.includes("eyes")) {
        mesh.visible = false;
      }

      return material;
    });

    mesh.material = Array.isArray(mesh.material) ? next : next[0];
  });

  attachCustomHead(root);
}

function attachCustomHead(root: THREE.Object3D) {
  const headBone =
    root.getObjectByName("spine006") ||
    root.getObjectByName("spine.006") ||
    root.getObjectByName("spine005");

  if (!headBone) return;

  // Size the new head from the hidden stock face bounds when available.
  const stockFace =
    root.getObjectByName("Plane007") || root.getObjectByName("Plane.007");
  let headScale = 0.22;
  if (stockFace) {
    stockFace.visible = true;
    const box = new THREE.Box3().setFromObject(stockFace);
    const size = new THREE.Vector3();
    box.getSize(size);
    stockFace.visible = false;
    headScale = Math.max(size.x, size.y, size.z) * 0.48 || 0.22;
    headScale = Math.min(Math.max(headScale, 0.12), 1.8);
  }

  const skin = new THREE.MeshStandardMaterial({
    color: "#b8794a",
    roughness: 0.62,
    metalness: 0,
    emissive: new THREE.Color("#3a1808"),
    emissiveIntensity: 0.05,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: "#0c0a08",
    roughness: 0.45,
    metalness: 0.08,
    emissive: new THREE.Color("#062e2a"),
    emissiveIntensity: 0.08,
    side: THREE.DoubleSide,
  });
  const browMat = new THREE.MeshStandardMaterial({
    color: "#140e0a",
    roughness: 0.85,
  });
  const eyeWhite = new THREE.MeshStandardMaterial({
    color: "#fff8f0",
    roughness: 0.25,
  });
  const irisMat = new THREE.MeshStandardMaterial({
    color: "#3b2212",
    roughness: 0.2,
    emissive: new THREE.Color("#1a0e06"),
    emissiveIntensity: 0.15,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: "#2dd4bf",
    roughness: 0.15,
    metalness: 0.6,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: "#111827",
    roughness: 0.4,
    metalness: 0.3,
  });

  const head = new THREE.Group();
  head.name = "customHead";

  // Skull — slightly wider / shorter than the stock clay head.
  const skull = new THREE.Mesh(
    new THREE.SphereGeometry(1, 28, 22),
    skin
  );
  skull.scale.set(0.92, 1.05, 0.88);
  skull.position.set(0, 0.05, 0.02);
  head.add(skull);

  // Jaw
  const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.72, 20, 16), skin);
  jaw.scale.set(0.95, 0.7, 0.85);
  jaw.position.set(0, -0.55, 0.08);
  head.add(jaw);

  // Ears
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), skin);
    ear.scale.set(0.45, 1, 0.7);
    ear.position.set(side * 0.88, 0.05, -0.05);
    head.add(ear);
  }

  // Hair volume — short textured crop, not the stock slick cut.
  const hairTop = new THREE.Mesh(
    new THREE.SphereGeometry(1.02, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.58),
    hairMat
  );
  hairTop.position.set(0, 0.18, -0.02);
  hairTop.scale.set(1.02, 1.05, 1.05);
  head.add(hairTop);

  const fringe = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 0.28, 0.45),
    hairMat
  );
  fringe.position.set(0.08, 0.55, 0.55);
  fringe.rotation.x = -0.35;
  fringe.rotation.z = 0.08;
  head.add(fringe);

  for (const side of [-1, 1]) {
    const sideburn = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.55, 0.35),
      hairMat
    );
    sideburn.position.set(side * 0.78, 0.05, 0.25);
    head.add(sideburn);
  }

  // Brows
  for (const side of [-1, 1]) {
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.07, 0.1), browMat);
    brow.position.set(side * 0.32, 0.28, 0.78);
    brow.rotation.z = side * -0.12;
    head.add(brow);
  }

  // Eyes
  for (const side of [-1, 1]) {
    const white = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 14), eyeWhite);
    white.scale.set(1.1, 0.85, 0.7);
    white.position.set(side * 0.3, 0.12, 0.78);
    head.add(white);

    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), irisMat);
    iris.position.set(side * 0.3, 0.12, 0.88);
    head.add(iris);

    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 8, 8),
      new THREE.MeshStandardMaterial({ color: "#050505" })
    );
    pupil.position.set(side * 0.3, 0.12, 0.94);
    head.add(pupil);
  }

  // Nose
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), skin);
  nose.scale.set(0.7, 1.1, 1.3);
  nose.position.set(0, -0.05, 0.92);
  head.add(nose);

  // Mouth
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.025, 8, 16, Math.PI),
    new THREE.MeshStandardMaterial({ color: "#8b4518", roughness: 0.7 })
  );
  mouth.position.set(0, -0.38, 0.82);
  mouth.rotation.x = Math.PI;
  mouth.rotation.z = Math.PI;
  head.add(mouth);

  // Round glasses — strong visual break from the template face.
  for (const side of [-1, 1]) {
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.025, 8, 24),
      frameMat
    );
    rim.position.set(side * 0.3, 0.12, 0.9);
    head.add(rim);

    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.2, 20), glassMat);
    lens.position.set(side * 0.3, 0.12, 0.9);
    head.add(lens);
  }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 0.03), frameMat);
  bridge.position.set(0, 0.14, 0.92);
  head.add(bridge);

  head.scale.setScalar(headScale);
  // Local offset so it sits on the neck like a real head.
  head.position.set(0, 0.02, 0.01);
  head.rotation.set(-0.08, 0, 0);

  // Avoid double-adding on HMR.
  const existing = headBone.getObjectByName("customHead");
  if (existing) headBone.remove(existing);

  headBone.add(head);
}
