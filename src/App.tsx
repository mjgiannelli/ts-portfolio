import { useContext, useEffect, useState } from 'react';
import CheatCodesView from './views/cheat-codes/cheat-codes.view';
import { WebGLCompatibilityContext } from './providers/webGLCompliant.context';

function App() {
  const [webGL, setWebGL] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkForAppUpdate, setCheckForAppUpdate] = useState<boolean>(true);
  const webGLCompatible = useContext(WebGLCompatibilityContext || {});

  useEffect(() => {
    if (checkForAppUpdate) {
      if (webGLCompatible !== null) {
        setCheckForAppUpdate(false);
        setWebGL(webGLCompatible as unknown as boolean);
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
        <div>Regular ole td app</div>
      )}
    </>
  );
}

export default App;
