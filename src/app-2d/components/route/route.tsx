import { ChangeEvent, useEffect, useState } from 'react';
import './route.scss';
import Newman from '../newman/newman';
import { CreateUserBodyDTO } from '../../api/dtos/api.dto';
import { Role, UserId } from '../../../utilties/enum/enum';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface RouteProps {
  route?: string;
  description: string;
  className?: string;
  url: string;
  reqType: string;
  bodyPlaceHolder?: Partial<CreateUserBodyDTO>;
  createBody?: string;
  userRole?: string;
  updateBody?: string;
  response: Record<string, any>;
  req: Function;
  onRadioBtnChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
  handleTextAreaChange?: (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => void | undefined;
  userId?: string;
  onUserIdChange?: (event: ChangeEvent<HTMLInputElement>) => void | undefined;
  errorMessage?: string | null;
  handleResetJsonBtn?: Function;
  pendingReq: boolean;
  setPendingReq: Function;
}

const Route: React.FC<RouteProps> = ({
  description,
  url,
  createBody,
  bodyPlaceHolder,
  response,
  className,
  reqType,
  req,
  onRadioBtnChange,
  handleTextAreaChange,
  userRole,
  userId,
  onUserIdChange,
  route,
  updateBody,
  errorMessage,
  handleResetJsonBtn,
  pendingReq,
  setPendingReq,
}) => {
  const [apiResp, setApiResp] = useState<Record<string, any> | null>(null);
  const [displayNed, setDisplayNed] = useState<boolean>(false);
  const handleRequest = async () => {
    const resp = await req();
    if (resp && resp.error) {
      setPendingReq(false);
      setDisplayNed(true);
      setApiResp(resp);
      setTimeout(() => {
        setDisplayNed(false);
      }, 3500);
      return;
    }
    setPendingReq(false);
    setApiResp(resp);
  };
  useEffect(() => {
    setApiResp(null);
    setDisplayNed(false);
  }, [description]);
  return (
    <div className={className ? className : ''}>
      <h2>
        {reqType}: {url}
      </h2>
      <p id="route-desc">{description}</p>
      {displayNed ? (
        <div className="ned-container">
          <Newman />
        </div>
      ) : (
        <>
          {createBody || updateBody || errorMessage ? (
            <>
              {handleResetJsonBtn ? (
                <button id="reset-btn" onClick={() => handleResetJsonBtn()}>
                  Reset
                </button>
              ) : null}
              <textarea
                value={reqType === 'POST' ? createBody : updateBody}
                defaultValue={JSON.stringify(bodyPlaceHolder, null, 2)}
                onChange={handleTextAreaChange}
                rows={5}
                cols={30}
              />
              <div className="roles">
                <label>Roles:</label>
                <div className="user-role-input">
                  <label>User</label>
                  <input
                    type="checkbox"
                    name="user"
                    onChange={onRadioBtnChange}
                    checked={userRole === Role.User}
                  />
                </div>
                <div className="user-role-input">
                  <label>Admin</label>
                  <input
                    type="checkbox"
                    name="admin"
                    onChange={onRadioBtnChange}
                    checked={userRole === Role.Admin}
                  />
                </div>
                <div className="user-role-input">
                  <label>Super User</label>
                  <input
                    type="checkbox"
                    name="superUser"
                    onChange={onRadioBtnChange}
                    checked={userRole === Role.Super_User}
                  />
                </div>
              </div>

              {errorMessage ? <p>{errorMessage}</p> : null}
            </>
          ) : (reqType === 'PATCH' || reqType === 'DELETE') &&
            route === 'delete-an-amazon' ? (
            <div className="roles">
              <div className="user-role-input">
                <label>Amazon Admin</label>
                <input
                  type="checkbox"
                  name="amazonAdmin"
                  onChange={onUserIdChange}
                  checked={userId === UserId.Amazon_Admin}
                />
              </div>
              <div className="user-role-input">
                <label>Amazon User</label>
                <input
                  type="checkbox"
                  name="amazonUser"
                  onChange={onUserIdChange}
                  checked={userId === UserId.Amazon_User}
                />
              </div>
            </div>
          ) : (reqType === 'PATCH' || reqType === 'DELETE') &&
            route === 'delete-a-walmart' ? (
            <div className="roles">
              <div className="user-role-input">
                <label>Walmart Admin</label>
                <input
                  type="checkbox"
                  name="walmartAdmin"
                  onChange={onUserIdChange}
                  checked={userId === UserId.Walmart_Admin}
                />
              </div>
              <div className="user-role-input">
                <label>Walmart User</label>
                <input
                  type="checkbox"
                  name="walmartUser"
                  onChange={onUserIdChange}
                  checked={userId === UserId.Walmart_User}
                />
              </div>
            </div>
          ) : null}
          <button
            id="execute-btn"
            onClick={() => handleRequest()}
            style={{ visibility: errorMessage ? 'hidden' : 'visible' }}
          >
            Execute
          </button>
        </>
      )}
      {apiResp ? (
        <div className="resp-container">
          <p id="server-resp">Server Response:</p>
          <div className="resp">
            <pre>{JSON.stringify(apiResp, null, 2)}</pre>
          </div>
        </div>
      ) : (
        <div className="resp-container">
          <p id="server-resp">
            {pendingReq ? 'Fetching Request' : 'Response Example:'}
          </p>
          <div className="resp">
            {pendingReq ? (
              <>
                <div className="loading" id="pending-req-loading">
                  <FontAwesomeIcon icon={faSpinner} />
                </div>
              </>
            ) : (
              <>
                <pre>{JSON.stringify(response, null, 2)}</pre>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Route;
