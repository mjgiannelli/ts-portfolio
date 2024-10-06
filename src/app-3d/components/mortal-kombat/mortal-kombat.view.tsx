import React from 'react';
import MortalKombatViewController from './mortal-kombat.view-controller';

interface MortalKombatViewProps {
  canvasRef: React.RefObject<HTMLDivElement>;
}

const MortalKombatView: React.FC<MortalKombatViewProps> = ({ canvasRef }) => {
  const { mountRef } = MortalKombatViewController(canvasRef);
  return <div ref={mountRef}></div>;
};

export default MortalKombatView;
