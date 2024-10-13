import React, { useState, useEffect, useRef } from 'react';
import Block from '../block/block';

interface ImageGridViewProps {
  imgContainerRef: React.RefObject<HTMLDivElement>;
}

interface BlockData {
  key: string;
  x: number;
  y: number;
  x0: number;
  y0: number;
  backgroundPositionX: number;
  backgroundPositionY: number;
}

const ImageGrid: React.FC<ImageGridViewProps> = ({ imgContainerRef }) => {
  const hasMounted = useRef(false);
  const blockSize = 6;
  const imageWidth = 180;
  const imageHeight = 276;
  const columns = imageWidth / blockSize;
  const rows = imageHeight / blockSize;
  const imageUrl = '/assets/images/card-2.png'; // Replace with your image path

  const [blocks, setBlocks] = useState<BlockData[]>([]);

  useEffect(() => {
    const imgContainerElement = imgContainerRef.current;
    if (!imgContainerElement) return;
    if (hasMounted.current) return;
    const { clientWidth: width, clientHeight: height } = imgContainerElement;
    hasMounted.current = true;
    const initialBlocks: BlockData[] = [];

    // Define the cluster area
    const clusterWidth = 200; // Adjust the size of the cluster
    const clusterHeight = 200; // Adjust the size of the cluster

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        initialBlocks.push({
          key: `${x}-${y}`,
          x: x * blockSize + Math.random() * clusterWidth,
          y: x * blockSize + Math.random() * clusterHeight,
          x0: x * blockSize,
          y0: y * blockSize,
          backgroundPositionX: x * blockSize,
          backgroundPositionY: y * blockSize,
        });
      }
    }

    setBlocks(initialBlocks);
    // Start the animation sequence
    setTimeout(() => animateToCluster(width), 1000); // After 1 second
    console.log('ran animation to cluster');
    setTimeout(() => animateToMiddleLeft(width, height), 2000); // After 3 seconds
    console.log('ran animation middle left');
    setTimeout(() => animateToLowerMiddle(width, height), 3000); // After 5 seconds
    console.log('ran animation to lower middle');
  }, []);

  const animateToCluster = (w: number) => {
    const clusterX = w - w * 0.1; // Adjust as needed
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

  const animateToMiddleLeft = (w: number, h: number) => {
    const deltaX = -w + w * 0.15; // Adjust as needed
    const deltaY = h / 2 - 25; // Adjust as needed
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

  const animateToLowerMiddle = (w: number, h: number) => {
    const finalX = w / 2 - imageWidth / 2;
    const finalY = h - imageHeight - 50; // 50px from bottom

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
    <>
      <>
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
      </>
    </>
  );
};

export default ImageGrid;
