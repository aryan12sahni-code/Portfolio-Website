import * as THREE from "three";

const HIDE_HUMAN_FACE = new Set([
  "Plane007",
  "Ear001",
  "Eyebrow",
  "EYEs001",
  "EYEs",
  "hair",
  "Face002",
]);

const METAL = "#8b9a9e";
const METAL_DARK = "#2a3236";
const ACCENT = "#2dd4bf";
const ACCENT_WARM = "#f59e0b";
const SHIRT = "#12161a";

/**
 * Robot avatar: hide the human face, attach a stylized robot head,
 * and turn hands/neck into brushed metal with teal LED accents.
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
    const name = mesh.name || "";
    const lower = name.toLowerCase();

    if (HIDE_HUMAN_FACE.has(name)) {
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

      const isHair = lower === "hair" || matName.includes("030");
      const isBrows = lower === "eyebrow" || matName.includes("014");
      const isEyes = lower.startsWith("eyes") || matName.includes("eyes");
      const isBody = lower === "bodyshirt";
      const isPant = lower === "pant";
      const isHand = lower === "hand";
      const isNeck = lower === "neck";
      const isShoe = lower === "shoe" || lower === "sole";

      if (isHair || isBrows || isEyes) {
        mesh.visible = false;
        return material;
      }

      if ((isHand || isNeck) && material.color) {
        material.color.set(METAL);
        material.roughness = 0.28;
        material.metalness = 0.92;
        if (material.emissive) material.emissive.set(ACCENT);
        material.emissiveIntensity = 0.08;
        material.needsUpdate = true;
      }

      if (isBody && material.color) {
        material.color.set(SHIRT);
        material.roughness = 0.55;
        material.metalness = 0.35;
        if (material.emissive) material.emissive.set("#0a3d38");
        material.emissiveIntensity = 0.05;
        material.needsUpdate = true;
      }

      if (isPant && material.color) {
        material.color.set(METAL_DARK);
        material.roughness = 0.4;
        material.metalness = 0.75;
        material.needsUpdate = true;
      }

      if (isShoe && material.color) {
        material.color.set("#1a1e22");
        material.roughness = 0.45;
        material.metalness = 0.6;
        material.needsUpdate = true;
      }

      return material;
    });

    mesh.material = Array.isArray(mesh.material) ? next : next[0];
  });

  attachRobotHead(root);
  attachRobotHandGuards(root);
}

function metalMat(
  color: string,
  opts: { metalness?: number; roughness?: number; emissive?: string; emissiveIntensity?: number } = {}
) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: opts.metalness ?? 0.9,
    roughness: opts.roughness ?? 0.3,
    emissive: new THREE.Color(opts.emissive ?? "#000000"),
    emissiveIntensity: opts.emissiveIntensity ?? 0,
  });
}

function attachRobotHead(root: THREE.Object3D) {
  const headBone =
    root.getObjectByName("spine006") ||
    root.getObjectByName("spine.006") ||
    root.getObjectByName("spine005");
  if (!headBone) return;

  // Size against the torso so the head reads at human proportions (~1/3 shoulder width).
  const body =
    root.getObjectByName("BODYSHIRT") ||
    root.getObjectByName("BODY.SHIRT") ||
    root.getObjectByName("bodyshirt");
  const stockFace =
    root.getObjectByName("Plane007") || root.getObjectByName("Plane.007");

  let scale = 2.4;
  if (body) {
    const box = new THREE.Box3().setFromObject(body);
    const size = new THREE.Vector3();
    box.getSize(size);
    // Local unit head is ~1.55 wide; target ~38% of shoulder span.
    scale = (size.x * 0.38) / 1.55;
  } else if (stockFace) {
    const was = stockFace.visible;
    stockFace.visible = true;
    const box = new THREE.Box3().setFromObject(stockFace);
    const size = new THREE.Vector3();
    box.getSize(size);
    stockFace.visible = was;
    scale = Math.max(size.x, size.y) * 1.35;
  }
  scale = Math.min(Math.max(scale, 1.8), 8);

  const head = new THREE.Group();
  head.name = "robotHead";

  const chassis = metalMat(METAL, { roughness: 0.25, metalness: 0.95 });
  const dark = metalMat(METAL_DARK, { roughness: 0.35, metalness: 0.85 });
  const glow = metalMat(ACCENT, {
    roughness: 0.2,
    metalness: 0.4,
    emissive: ACCENT,
    emissiveIntensity: 1.4,
  });
  const glowWarm = metalMat(ACCENT_WARM, {
    roughness: 0.25,
    metalness: 0.35,
    emissive: ACCENT_WARM,
    emissiveIntensity: 1.1,
  });

  // Main cranial shell — larger, rounder presence
  const cranium = new THREE.Mesh(
    new THREE.BoxGeometry(1.75, 1.55, 1.5),
    chassis
  );
  cranium.position.set(0, 0.15, 0.08);
  head.add(cranium);

  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.9, 28, 18), chassis);
  dome.scale.set(1.08, 0.75, 1);
  dome.position.set(0, 0.82, 0.02);
  head.add(dome);

  const jaw = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.5, 1), dark);
  jaw.position.set(0, -0.55, 0.18);
  head.add(jaw);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.22), dark);
  visor.position.set(0, 0.25, 0.78);
  head.add(visor);

  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.CircleGeometry(0.2, 24), glow);
    eye.position.set(side * 0.34, 0.25, 0.9);
    head.add(eye);

    const pupil = new THREE.Mesh(
      new THREE.CircleGeometry(0.08, 14),
      new THREE.MeshStandardMaterial({
        color: "#04120f",
        emissive: ACCENT,
        emissiveIntensity: 0.55,
      })
    );
    pupil.position.set(side * 0.34, 0.25, 0.91);
    head.add(pupil);
  }

  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.06, 0.7, 10),
    dark
  );
  antenna.position.set(0.42, 1.3, -0.08);
  head.add(antenna);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 14), glowWarm);
  tip.position.set(0.42, 1.7, -0.08);
  head.add(tip);

  for (const side of [-1, 1]) {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.65, 0.4), dark);
    vent.position.set(side * 0.92, 0.08, 0.05);
    head.add(vent);
    for (let i = 0; i < 3; i++) {
      const slit = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.08, 0.32),
        glow
      );
      slit.position.set(side * 0.98, -0.08 + i * 0.16, 0.05);
      head.add(slit);
    }
  }

  const chinLed = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.08, 0.1), glow);
  chinLed.position.set(0, -0.52, 0.7);
  head.add(chinLed);

  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 0.35, 22),
    dark
  );
  collar.position.set(0, -1.05, 0.05);
  head.add(collar);

  head.scale.setScalar(scale);
  // Lift slightly so the oversized head sits cleanly above the shoulders.
  head.position.set(0, 0.12, 0.08);
  head.rotation.set(-0.05, 0, 0);

  headBone.add(head);
}

function attachRobotHandGuards(root: THREE.Object3D) {
  const pairs: Array<[string[], string]> = [
    [["handL", "hand.L", "HandL"], "robotHandL"],
    [["handR", "hand.R", "HandR"], "robotHandR"],
  ];

  for (const [candidates, guardName] of pairs) {
    let bone: THREE.Object3D | undefined;
    for (const n of candidates) {
      bone = root.getObjectByName(n);
      if (bone) break;
    }
    if (!bone) continue;

    const guard = new THREE.Group();
    guard.name = guardName;

    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.22, 0.7),
      metalMat(METAL, { roughness: 0.28, metalness: 0.95 })
    );
    plate.position.set(0, 0.05, 0.05);
    guard.add(plate);

    const knuckle = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.12, 0.2),
      metalMat(METAL_DARK, { roughness: 0.35, metalness: 0.9 })
    );
    knuckle.position.set(0, 0.12, 0.28);
    guard.add(knuckle);

    const led = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.05, 0.08),
      metalMat(ACCENT, {
        roughness: 0.2,
        metalness: 0.4,
        emissive: ACCENT,
        emissiveIntensity: 1.1,
      })
    );
    led.position.set(0, 0.16, 0.1);
    guard.add(led);

    const handMesh = root.getObjectByName("Hand");
    let s = 1.1;
    if (handMesh) {
      const box = new THREE.Box3().setFromObject(handMesh);
      const size = new THREE.Vector3();
      box.getSize(size);
      s = Math.min(Math.max(Math.max(size.x, size.z) * 0.85, 0.6), 3.5);
    }
    guard.scale.setScalar(s);
    guard.position.set(0, 0.02, 0.05);

    bone.add(guard);
  }
}
