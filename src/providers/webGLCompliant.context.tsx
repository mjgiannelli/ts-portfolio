import { ReactNode, useState, useEffect, createContext } from 'react';

interface WebGLCompatibilityContextType {
  webGLCompatible: boolean | null;
}

export const WebGLCompatibilityContext =
  createContext<WebGLCompatibilityContextType | null>(null);

interface WebGLCompatibilityProviderProps {
  children: ReactNode;
}

const checkThreeJsCompatibility = (): boolean => {
  const canvas = document.createElement('canvas');
  const gl =
    (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

  return gl ? true : false;
};

const WEBGLCompliantProvider: React.FC<WebGLCompatibilityProviderProps> = ({
  children,
}) => {
  const [webGLCompatible, setWebGLCompatible] = useState<boolean | null>(null);

  useEffect(() => {
    // Perform the check after the component has mounted
    const isCompatible = checkThreeJsCompatibility();
    setWebGLCompatible(isCompatible);
  }, []); // Empty dependency array ensures this runs only once on mount

  const contextValue = { webGLCompatible };

  return (
    <WebGLCompatibilityContext.Provider value={contextValue}>
      {children}
    </WebGLCompatibilityContext.Provider>
  );
};

export default WEBGLCompliantProvider;
