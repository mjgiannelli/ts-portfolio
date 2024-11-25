const Newman: React.FC = () => {
  const playAudio = () => {
    const audio = new Audio('/assets/audio/ned.mp3');
    audio.play();
  };
  playAudio();
  return (
    <>
      <img src="/assets/images/ned-nobg.gif" alt="Ned gif." />
    </>
  );
};

export default Newman;
