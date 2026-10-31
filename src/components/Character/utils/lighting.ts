import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Soft warm key for the human face / skin.
  const directionalLight = new THREE.DirectionalLight(0xffe2c8, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(0.4, 0.1, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x2dd4bf, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const fillLight = new THREE.PointLight(0xf59e0b, 0, 40, 2);
  fillLight.position.set(-5, 7, 3);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x5eead4, 0, 30, 2);
  rimLight.position.set(2, 4, -3);
  scene.add(rimLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.52,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.15,
      duration: duration,
      ease: ease,
    });
    gsap.to(fillLight, {
      intensity: 0.45,
      duration: duration,
      ease: ease,
    });
    gsap.to(rimLight, {
      intensity: 0.55,
      duration: duration,
      ease: ease,
    });
    // Keep the rim glow on desktop only — mobile stacks the avatar without backlight.
    if (window.innerWidth > 1024) {
      gsap.to(".character-rim", {
        y: "55%",
        opacity: 1,
        delay: 0.2,
        duration: 2,
      });
    }
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
