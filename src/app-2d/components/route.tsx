import { MouseEventHandler, useState } from 'react';

export interface RouteProps {
  descrption: string;
  url: string;
  reqType: string;
  body?: Record<string, any>;
  response: Record<string, any>;
  req: MouseEventHandler<HTMLButtonElement>;
}

const Route: React.FC<RouteProps> = ({
  descrption,
  url,
  body,
  response,
  reqType,
  req,
}) => {
  const [apiResp, setApiResp] = useState<Record<string, any> | null>(null);
  return (
    <>
      <h2>
        {reqType}: {url}
      </h2>
      <p>{descrption}</p>
      {body ? <textarea /> : null}
      <button onClick={req}>Exexcute</button>
      {apiResp ? (
        <pre>{JSON.stringify(response.data, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(response.data, null, 2)}</pre>
      )}
    </>
  );
};

export default Route;
