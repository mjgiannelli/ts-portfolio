import { useState, useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';
import * as THREE from 'three';

const CheatCodesViewController = () => {
  const KONAMI_CODE: number[] = [65, 66, 65, 67, 65, 66, 66];
  // ABACABB sequence corresponds to key codes: A(65), B(66), A(65), C(67), A(65), B(66), B(66)
  const mountRef = useRef<HTMLDivElement | null>(null);
  const w = window.innerWidth;
  const h = window.innerHeight;
  const [keySequence, setKeySequence] = useState<number[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mount) {
      mount.appendChild(renderer.domElement);
    }

    // Set the camera position first to a non-zero value
    camera.position.z = 5; // Set the distance from the camera

    // Calculate the visible height and width after setting the camera's z position
    const distanceFromCamera = Math.abs(camera.position.z); // Distance from the camera to the object
    const fovInRadians = (camera.fov * Math.PI) / 180; // Convert FOV to radians

    // Calculate visible height
    const visibleHeight = 2 * distanceFromCamera * Math.tan(fovInRadians / 2);

    // Calculate visible width using the aspect ratio
    const visibleWidth = visibleHeight * camera.aspect;

    console.log(`Visible Height: ${visibleHeight}`);
    console.log(`Visible Width: ${visibleWidth}`);

    // Create the points for the line
    const numPoints = 100; // Number of points in the line
    const waveAmplitude = 0.25; // The height of the wave
    const waveFrequency = 5; // The frequency of the wave
    const lineLength = visibleWidth; // The length of the line in world units (beyond the width of the screen)

    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * lineLength - lineLength / 2; // x values centered on the screen
      const y = Math.sin(i * waveFrequency) * waveAmplitude; // y values based on sine wave
      points.push(new THREE.Vector3(x, y, 0));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xa06819 });
    const line = new THREE.Line(geometry, material);

    // Center the line in the view
    line.position.x = -10;
    scene.add(line);

    // Animation variables
    const speed = 0.15; // Speed of the line's movement
    let lineOffset = 0; // To track how much the line has moved

    const animate = (time: number) => {
      requestAnimationFrame(animate);

      const positions = geometry.attributes.position.array as Float32Array;

      // Update line's position to move from left to right
      for (let i = 0; i < numPoints; i++) {
        const x = (i / numPoints) * lineLength - lineLength / 2 + lineOffset; // Move the line across the screen
        const y = Math.sin(x * waveFrequency + time * 0.002) * waveAmplitude;
        positions[i * 3] = x; // Update x coordinate (index 0 in 3D coordinates: [x, y, z])
        positions[i * 3 + 1] = y; // Update y coordinate
      }

      geometry.attributes.position.needsUpdate = true; // Notify Three.js that the geometry has changed

      // Move the entire line
      lineOffset += speed;

      // Stop animation when the start of the line hits the right side of the screen
      const rightEdgeOfScreen = visibleWidth / 2; // The right edge in world coordinates
      const startOfLineX = lineOffset - lineLength; // The x-position of the start of the line
      if (startOfLineX < rightEdgeOfScreen) {
        renderer.render(scene, camera);
      }
    };

    animate(0); // Start animation

    // Cleanup on component unmount
    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return { mountRef };
};

export default CheatCodesViewController;
