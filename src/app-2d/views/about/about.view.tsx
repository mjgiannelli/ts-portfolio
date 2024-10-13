import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import './about.view.scss';
import BaseballCardBack from '../../components/baseball-card/back/back';
import BaseballCardFront from '../../components/baseball-card/front/front';
import Selfie from '../../components/block/block';
import BlocksGrid from '../../components/image-grid/image-grid';

const About: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <BlocksGrid />
    </>
  );
};

export default About;
