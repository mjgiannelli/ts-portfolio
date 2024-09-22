import CheatCodesViewController from './cheat-codes.view-controller';
const CheatCodesView = () => {
  const { mountRef } = CheatCodesViewController();
  return <div ref={mountRef}></div>;
};

export default CheatCodesView;
