import { useState } from 'react';
import './route.scss';
import Newman from '../newman/newman';

export interface RouteProps {
  description: string;
  className?: string;
  url: string;
  reqType: string;
  body?: Record<string, any>;
  response: Record<string, any>;
  req: Function;
}

const Route: React.FC<RouteProps> = ({
  description,
  url,
  body,
  response,
  className,
  reqType,
  req,
}) => {
  const [apiResp, setApiResp] = useState<Record<string, any> | null>(null);
  const [displayNed, setDisplayNed] = useState<boolean>(false);
  const handleRequest = async () => {
    const resp = await req();
    if (resp.error) {
      setDisplayNed(true);
      setApiResp(resp);
      setTimeout(() => {
        setDisplayNed(false);
      }, 3500);
      return;
    }
    setApiResp(resp);
  };
  return (
    <div className={className ? className : ''}>
      <h2>
        {reqType}: {url}
      </h2>
      <p>{description}</p>
      {displayNed ? (
        <div className="ned-container">
          <Newman />
        </div>
      ) : (
        <>
          {body ? <textarea /> : null}
          <button onClick={() => handleRequest()}>Exexcute</button>
        </>
      )}
      {apiResp ? (
        <pre>{JSON.stringify(apiResp, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(response.data, null, 2)}</pre>
      )}
    </div>
  );
};

export default Route;
