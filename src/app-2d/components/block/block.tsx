// Block.tsx
import React from 'react';
import './block.scss';

interface BlockProps {
  x: number;
  y: number;
  size: number;
  backgroundPositionX: number;
  backgroundPositionY: number;
  imageUrl: string;
  animate?: boolean;
}

const Block: React.FC<BlockProps> = ({
  x,
  y,
  size,
  backgroundPositionX,
  backgroundPositionY,
  imageUrl,
  animate = true,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
        backgroundSize: '180px 276px',
        transition: animate ? 'transform 1s ease-in-out' : 'none',
      }}
    />
  );
};

export default Block;
