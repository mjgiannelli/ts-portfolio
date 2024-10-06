import React from 'react';
import BlasterSceneViewController from './blaster-scene.view-controller';

interface BlasterScenetViewProps {
  canvasRef: React.RefObject<HTMLDivElement>;
}

const BlasterScenetView: React.FC<BlasterScenetViewProps> = ({ canvasRef }) => {
  const { mountRef } = BlasterSceneViewController(canvasRef);
  return <div ref={mountRef}></div>;
};

export default BlasterScenetView;
