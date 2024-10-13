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
}

const Block: React.FC<BlockProps> = ({
  x,
  y,
  size,
  backgroundPositionX,
  backgroundPositionY,
  imageUrl,
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
        transition: 'transform 1s ease-in-out',
      }}
    />
  );
};

export default Block;
