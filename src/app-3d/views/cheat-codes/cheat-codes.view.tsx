import React, { useRef } from 'react';
import MortalKombatView from '../../components/mortal-kombat/mortal-kombat.view';
import CheatCodesViewController from './cheat-codes.view-controller';
import './cheat-codes.view.scss';

const CheatCodesView: React.FC = () => {
  const { showMortalKombat } = CheatCodesViewController();
  const sceneCanvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div>
        <h1>Cheat Codes!!</h1>
        <div className="scene-canvas" ref={sceneCanvasRef}>
          {showMortalKombat ? (
            <MortalKombatView canvasRef={sceneCanvasRef} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CheatCodesView;
