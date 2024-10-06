import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BlasterSceneViewController = (
  canvasRef: React.RefObject<HTMLDivElement>,
) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const mount = mountRef.current;
    const { clientWidth: width, clientHeight: height } = canvasElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);
    if (mount) {
      mount.appendChild(renderer.domElement);
    }

    renderer.render(scene, camera);

    // Cleanup on component unmount
    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [canvasRef]); // Re-run when canvasRef changes

  return { mountRef };
};

export default BlasterSceneViewController;
