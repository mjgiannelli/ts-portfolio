import React, { useRef, useState } from 'react';
import './about.view.scss';
import ImageGrid from '../../components/image-grid/image-grid';
import AboutViewController from './about.view-controller';

const About: React.FC = () => {
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const { displayImage, setDisplayImage } = AboutViewController();
  return (
    <>
      <h1 style={{ textAlign: 'center', width: '90%', margin: 'auto' }}>
        Senior Full Stack Software Developer
      </h1>
      <p
        style={{
          textAlign: 'center',
          width: '95%',
          margin: 'auto',
          marginTop: '1rem',
        }}
      >
        I have a passion for bringing ideas to life. Let's chat about what I can
        do for you.
      </p>
      <div
        id="img-cont"
        ref={imgContainerRef}
        style={{
          width: '90%',
          margin: 'auto',
          height: '50vh',
          position: 'relative',
        }}
      >
        <>
          {displayImage ? (
            <ImageGrid imgContainerRef={imgContainerRef} />
          ) : null}
        </>
      </div>
    </>
  );
};

export default About;
