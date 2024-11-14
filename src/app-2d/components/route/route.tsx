import { useState } from 'react';
import './route.scss';
import Newman from '../newman/newman';
import { CreateUserBodyDTO, UpdateUserBodyDTO } from '../../api/api.dto';

export interface RouteProps {
  description: string;
  className?: string;
  url: string;
  reqType: string;
  createBody?: CreateUserBodyDTO;
  updateBody?: UpdateUserBodyDTO;
  response: Record<string, any>;
  req: Function;
}

const Route: React.FC<RouteProps> = ({
  description,
  url,
  createBody,
  response,
  className,
  reqType,
  req,
}) => {
  const [apiResp, setApiResp] = useState<Record<string, any> | null>(null);
  const [displayNed, setDisplayNed] = useState<boolean>(false);
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify(createBody, null, 2),
  );
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
          {createBody ? (
            <>
              <textarea
                value={requestBody}
                defaultValue={JSON.stringify(createBody, null, 2)}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={6}
                cols={30}
              />
              <input type="radio" name=""></input>
            </>
          ) : null}
          <button onClick={() => handleRequest()}>Exexcute</button>
        </>
      )}
      {apiResp ? (
        <div className="resp-container">
          <p>Server Response:</p>
          <pre>{JSON.stringify(apiResp, null, 2)}</pre>
        </div>
      ) : (
        <div className="resp-container">
          <p>Response Example:</p>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Route;
