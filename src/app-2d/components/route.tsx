import { useState } from 'react';

export interface RouteProps {
  descrption: string;
  url: string;
  reqType: string;
  body?: Record<string, any>;
  response: Record<string, any>;
}

const Route: React.FC<RouteProps> = ({
  descrption,
  url,
  body,
  response,
  reqType,
}) => {
  const [apiResp, setApiResp] = useState<Record<string, any> | null>(null);
  return (
    <>
      <h2>
        {reqType}: {url}
      </h2>
      <p>{descrption}</p>
      {body ? <textarea /> : null}
      {apiResp ? (
        <pre>{JSON.stringify(response.data, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(response.data, null, 2)}</pre>
      )}
    </>
  );
};

export default Route;
