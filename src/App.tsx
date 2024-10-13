import { useContext, useEffect, useState } from 'react';
import { WebGLCompatibilityContext } from './providers/webGLCompliant.context';
import CheatCodesView from './app-3d/views/cheat-codes/cheat-codes.view';
import App2D from './app-2d/app-2d';

function App() {
  const [webGL, setWebGL] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkForAppUpdate, setCheckForAppUpdate] = useState<boolean>(true);
  const webGLCompatible = useContext(WebGLCompatibilityContext || {});
  const [colorTheme, setColorTheme] = useState<string | null>(null);
  useEffect(() => {
    if (checkForAppUpdate && colorTheme !== null) {
      if (webGLCompatible !== null) {
        setCheckForAppUpdate(false);
        setWebGL(false);
        setLoading(false);
      }
    }
  }, [checkForAppUpdate, webGLCompatible, colorTheme]);

  useEffect(() => {
    const cTheme = localStorage.getItem('colorTheme');
    if (cTheme === 'Light') {
      const htmlEl = document.querySelector('html');
      htmlEl?.setAttribute('theme', 'Light');
      setColorTheme('Light');
    } else {
      setColorTheme('Dark');
    }
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : webGL ? (
        <div className="App">
          <CheatCodesView />
        </div>
      ) : (
        <App2D colorTheme={colorTheme as string} />
      )}
    </>
  );
}

export default App;
