import { useContext, useEffect, useState } from 'react';
import { WebGLCompatibilityContext } from './providers/webGLCompliant.context';
import CheatCodesView from './app-3d/views/cheat-codes/cheat-codes.view';
import App2D from './app-2d/app-2d';

function App() {
  const [webGL, setWebGL] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkForAppUpdate, setCheckForAppUpdate] = useState<boolean>(true);
  const webGLCompatible = useContext(WebGLCompatibilityContext || {});

  useEffect(() => {
    if (checkForAppUpdate) {
      if (webGLCompatible !== null) {
        setCheckForAppUpdate(false);
        setWebGL(false);
        setLoading(false);
      }
    }
  }, [checkForAppUpdate, webGLCompatible]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : webGL ? (
        <div className="App">
          <CheatCodesView />
        </div>
      ) : (
        <App2D />
      )}
    </>
  );
}

export default App;
