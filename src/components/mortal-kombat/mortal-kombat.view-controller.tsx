import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import BlasterScene from '../../scenes/blaster/blaster.scene';

const MortalKombatViewController = (
  canvasRef: React.RefObject<HTMLDivElement>,
) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const playAudio = () => {
    const audio = new Audio('/assets/audio/scorpion.mp3');
    audio.play();
  };

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const mount = mountRef.current;
    const { clientWidth: width, clientHeight: height } = canvasElement;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const scene = new BlasterScene(camera);
    renderer.setSize(width, height);
    if (mount) {
      mount.appendChild(renderer.domElement);
    }

    scene.initialize();

    const tick = () => {
      scene.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
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
    tick();
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
