import { useState } from 'react';

const AboutViewController = () => {
  const [displayImage, setDisplayImage] = useState<boolean>(true);
  return {
    displayImage,
    setDisplayImage,
  };
};

export default AboutViewController;
