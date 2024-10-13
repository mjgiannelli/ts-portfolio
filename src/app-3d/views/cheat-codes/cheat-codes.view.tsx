import React, { useRef } from 'react';
import './cheat-codes.view.scss';

const CheatCodesView: React.FC = () => {
  const sceneCanvasRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div>
        <h1>Cheat Codes!!</h1>
        <div className="scene-canvas" ref={sceneCanvasRef}>
          {/* {showMortalKombat ? (
            <MortalKombatView canvasRef={sceneCanvasRef} />
          ) : null} */}
        </div>
      </div>
    </>
  );
};

export default CheatCodesView;
