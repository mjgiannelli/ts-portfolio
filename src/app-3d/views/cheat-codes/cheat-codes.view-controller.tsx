const CheatCodesViewController = () => {
  // const KONAMI_CODE: number[] = [65, 66, 65, 67, 65, 66, 66];
  // ABACABB sequence corresponds to key codes: A(65), B(66), A(65), C(67), A(65), B(66), B(66)
  // const [keySequence, setKeySequence] = useState<number[]>([]);
  // const [showMortalKombat, setShowMortalKombat] = useState<boolean>(true);
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     setKeySequence((prevKeys) => {
  //       const updatedKeys = [...prevKeys, e.keyCode].slice(-KONAMI_CODE.length);
  //       // Check if the key sequence matches the Konami code
  //       if (updatedKeys.join(',') === KONAMI_CODE.join(',')) {
  //         document.body.style.backgroundColor = 'red'; // Change background to red
  //         setShowMortalKombat(true);
  //         setTimeout(() => {
  //           document.body.style.backgroundColor = 'white';
  //           setShowMortalKombat(false);
  //           setKeySequence([]);
  //         }, 2000);
  //       }
  //       return updatedKeys;
  //     });
  //   };
  // Attach the event listener
  //   window.addEventListener('keydown', handleKeyDown);
  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);
  // return { showMortalKombat };
};

export default CheatCodesViewController;
