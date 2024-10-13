import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KeyDisplay } from '../../../utilties/utils';
import { Texture } from 'three';
import { CharacterControls } from '../../../utilties/character-controls';

const MortalKombatViewController = (
  canvasRef: React.RefObject<HTMLDivElement>,
) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const mount = mountRef.current;
    const { clientWidth: width, clientHeight: height } = canvasElement;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa8def0);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.y = 5;
    camera.position.z = 5;
    camera.position.x = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // const scene = new BlasterScene(camera);
    renderer.setSize(width, height);
    if (mount) {
      mount.appendChild(renderer.domElement);
    }
    function generateFloor() {
      // TEXTURES
      const textureLoader = new THREE.TextureLoader();
      const sandBaseColor = textureLoader.load(
        'assets/textures/sand/Sand 002_COLOR.jpg',
      );
      const sandNormalMap = textureLoader.load(
        'assets/textures/sand/Sand 002_NRM.jpg',
      );
      const sandHeightMap = textureLoader.load(
        'assets/textures/sand/Sand 002_DISP.jpg',
      );
      const sandAmbientOcclusion = textureLoader.load(
        'assets/textures/sand/Sand 002_OCC.jpg',
      );

      const WIDTH = 80;
      const LENGTH = 80;

      const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
      const material = new THREE.MeshStandardMaterial({
        map: sandBaseColor,
        normalMap: sandNormalMap,
        displacementMap: sandHeightMap,
        displacementScale: 0.1,
        aoMap: sandAmbientOcclusion,
      });
      wrapAndRepeatTexture(material.map as Texture);
      wrapAndRepeatTexture(material.normalMap as Texture);
      wrapAndRepeatTexture(material.displacementMap as Texture);
      wrapAndRepeatTexture(material.aoMap as Texture);

      const floor = new THREE.Mesh(geometry, material);
      floor.receiveShadow = true;
      floor.rotation.x = -Math.PI / 2;
      scene.add(floor);
    }

    function wrapAndRepeatTexture(map: THREE.Texture) {
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.x = map.repeat.y = 10;
    }

    function light() {
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(-60, 100, -10);
      dirLight.castShadow = true;
      dirLight.shadow.camera.top = 50;
      dirLight.shadow.camera.bottom = -50;
      dirLight.shadow.camera.left = -50;
      dirLight.shadow.camera.right = 50;
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 200;
      dirLight.shadow.mapSize.width = 4096;
      dirLight.shadow.mapSize.height = 4096;
      scene.add(dirLight);
      // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
    }

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    //CONTROLS
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 15;
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
    orbitControls.update();

    generateFloor();
    light();

    let characterControls: CharacterControls;

    new GLTFLoader().load(
      '/assets/models/three-d/Soldier.glb',
      function (gltf) {
        const model = gltf.scene;
        model.traverse(function (object: any) {
          if (object.isMesh) object.castShadow = true;
        });
        scene.add(model);

        const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
        const mixer = new THREE.AnimationMixer(model);
        const animationsMap: Map<string, THREE.AnimationAction> = new Map();
        gltfAnimations
          .filter((a) => a.name !== 'TPose')
          .forEach((a: THREE.AnimationClip) => {
            animationsMap.set(a.name, mixer.clipAction(a));
          });
        characterControls = new CharacterControls(
          model,
          mixer,
          animationsMap,
          orbitControls,
          camera,
          'Idle',
        );
      },
    );

    const keypressed = {};
    const keyDisplayQueue = new KeyDisplay();
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle();
      } else {
        (keypressed as any)[event.key.toLowerCase()] = true;
      }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      keyDisplayQueue.up(event.key);
      (keypressed as any)[event.key.toLowerCase()] = false;
    });

    const clock = new THREE.Clock();

    function animate() {
      const mixerUpdateDelta = clock.getDelta();
      if (characterControls) {
        characterControls.update(mixerUpdateDelta, keypressed);
      }
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
    // scene.initialize();

    // const tick = () => {
    //   scene.update();
    //   renderer.render(scene, camera);
    //   requestAnimationFrame(tick);
    // };
    // // Set the camera position
    // camera.position.z = 5;

    // // Blood rain system
    // const bloodDropCount = 200;
    // const bloodGeometry = new THREE.BufferGeometry();
    // const bloodPositions = new Float32Array(bloodDropCount * 3);

    // for (let i = 0; i < bloodDropCount; i++) {
    //   const x = (Math.random() - 0.5) * 10;
    //   const y = Math.random() * 10; // Starts from above the view
    //   const z = (Math.random() - 0.5) * 10;
    //   bloodPositions[i * 3] = x;
    //   bloodPositions[i * 3 + 1] = y;
    //   bloodPositions[i * 3 + 2] = z;
    // }

    // bloodGeometry.setAttribute(
    //   'position',
    //   new THREE.BufferAttribute(bloodPositions, 3),
    // );

    // const bloodMaterial = new THREE.PointsMaterial({
    //   color: 0x8b0000, // Dark red color
    //   size: 0.05,
    //   transparent: true,
    //   opacity: 0.9,
    // });

    // const bloodRain = new THREE.Points(bloodGeometry, bloodMaterial);
    // scene.add(bloodRain);

    // // Line movement system (wave)
    // const numPoints = 100;
    // const waveAmplitude = 0.25;
    // const waveFrequency = 5;
    // const lineLength = 10;
    // const points = [];

    // for (let i = 0; i < numPoints; i++) {
    //   const x = (i / numPoints) * lineLength - lineLength / 2;
    //   const y = Math.sin(i * waveFrequency) * waveAmplitude;
    //   points.push(new THREE.Vector3(x, y, 0));
    // }

    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0xa06819 });
    // const line = new THREE.Line(geometry, material);
    // scene.add(line);

    // const lineOffset = 0;
    // const speed = 0.15;

    // Animate function
    // const animate = (time: number) => {
    //   requestAnimationFrame(animate);

    //   const linePositions = geometry.attributes.position.array as Float32Array;

    //   // Update line movement
    //   for (let i = 0; i < numPoints; i++) {
    //     const x = (i / numPoints) * lineLength - lineLength / 2 + lineOffset;
    //     const y = Math.sin(x * waveFrequency + time * 0.002) * waveAmplitude;
    //     linePositions[i * 3] = x;
    //     linePositions[i * 3 + 1] = y;
    //   }
    //   geometry.attributes.position.needsUpdate = true;

    //   lineOffset += speed;

    //   // Blood drop animation
    //   const bloodPositions = bloodGeometry.attributes.position
    //     .array as Float32Array;

    //   for (let i = 0; i < bloodDropCount; i++) {
    //     let y = bloodPositions[i * 3 + 1]; // Y position of the drop
    //     y -= 0.02 * Math.random(); // Move the drop down

    //     // If the drop goes below a certain point, reset it to the top
    //     if (y < -5) {
    //       y = 5;
    //     }

    //     bloodPositions[i * 3 + 1] = y;
    //   }
    //   bloodGeometry.attributes.position.needsUpdate = true;

    //   // Render the scene
    //   renderer.render(scene, camera);
    // };

    // animate(0); // Start the animation
    // playAudio();
    // tick();
    // Cleanup on component unmount
    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [canvasRef]); // Re-run when canvasRef changes

  return { mountRef };
};

export default MortalKombatViewController;
