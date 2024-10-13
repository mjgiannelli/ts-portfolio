import React, { useState, useEffect, useRef } from 'react';
import Block from '../block/block';

interface BlockData {
  key: string;
  x: number;
  y: number;
  x0: number;
  y0: number;
  backgroundPositionX: number;
  backgroundPositionY: number;
}

const ImageGrid: React.FC = () => {
  const hasMounted = useRef(false);
  const blockSize = 6;
  const imageWidth = 180;
  const imageHeight = 276;
  const columns = imageWidth / blockSize;
  const rows = imageHeight / blockSize;
  const imageUrl = '/assets/images/card-2.png'; // Replace with your image path

  const [blocks, setBlocks] = useState<BlockData[]>([]);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    const initialBlocks: BlockData[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (x === 10 && y === 29) {
          console.log('initializing block');
        }
        initialBlocks.push({
          key: `${x}-${y}`,
          x: x * blockSize,
          y: y * blockSize,
          x0: x * blockSize,
          y0: y * blockSize,
          backgroundPositionX: x * blockSize,
          backgroundPositionY: y * blockSize,
        });
      }
    }

    setBlocks(initialBlocks);
    // Start the animation sequence
    setTimeout(animateToCluster, 1000); // After 1 second
    console.log('ran animation to cluster');
    setTimeout(animateToMiddleLeft, 2000); // After 3 seconds
    console.log('ran animation middle left');
    setTimeout(animateToLowerMiddle, 3000); // After 5 seconds
    console.log('ran animation to lower middle');
  }, []);

  const animateToCluster = () => {
    const clusterX = window.innerWidth - window.innerWidth * 0.1; // Adjust as needed
    const clusterY = 0;
    const clusterWidth = 501;
    const clusterHeight = 300;

    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        return {
          ...block,
          x: clusterX + Math.random() * clusterWidth,
          y: clusterY + Math.random() * clusterHeight,
        };
      }),
    );
  };

  const animateToMiddleLeft = () => {
    const deltaX = -window.innerWidth + window.innerWidth * 0.15; // Adjust as needed
    const deltaY = window.innerHeight / 2 - 25; // Adjust as needed
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        return {
          ...block,
          x: block.x + deltaX + Math.random() * 500,
          y: block.y + deltaY + Math.random() * 301,
        };
      }),
    );
  };

  const animateToLowerMiddle = () => {
    const finalX = window.innerWidth / 2 - imageWidth / 2;
    const finalY = window.innerHeight - imageHeight - 50; // 50px from bottom

    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        // if (block.key === '10-29') {
        //   console.log('Animating to Lower Middle');
        // }
        return {
          ...block,
          x: finalX + block.x0,
          y: finalY + block.y0,
        };
      }),
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {blocks.map((block) => (
        <Block
          key={block.key}
          x={block.x}
          y={block.y}
          size={blockSize}
          backgroundPositionX={block.backgroundPositionX}
          backgroundPositionY={block.backgroundPositionY}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
