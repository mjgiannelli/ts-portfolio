import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import './about.view.scss';
import BaseballCardBack from '../../components/baseball-card/back/back';
import BaseballCardFront from '../../components/baseball-card/front/front';

const About: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <article className="box">
      <h2 className="title">
        About Me <br />
      </h2>
      <div className="row flex column">
        <p className="col-10">
          Accountant turned Web Developer <span>&copy;</span> May 2, 2021.
        </p>
        <p id="bio" className="col-10">
          I've found my passion in life. Coding satiates everything I look for
          in a position. It's challenging, logic-based, and always evolving,
          keeping me in a perpetual state of being a student. I wake up every
          morning thrilled to code!
        </p>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <BaseballCardFront handleClick={handleClick} />
          <BaseballCardBack handleClick={handleClick} />
        </ReactCardFlip>
      </div>
    </article>
  );
};

export default About;
