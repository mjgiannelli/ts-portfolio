const Newman: React.FC = () => {
  const playAudio = () => {
    const audio = new Audio('/assets/audio/ned.mp3');
    audio.play();
  };
  return (
    <>
      <img
        src="/assets/images/ned-nobg.gif"
        alt="Ned gif."
        onClick={playAudio}
      />
    </>
  );
};

export default Newman;
