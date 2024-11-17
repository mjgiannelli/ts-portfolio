import { ChangeEvent, useState } from 'react';
import './route.scss';
import Newman from '../newman/newman';
import { CreateUserBodyDTO } from '../../api/api.dto';
import { Role, UserId } from '../../../utilties/enum/enum';

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
}) => {
  const [apiResp, setApiResp] = useState<Record<string, any> | null>(null);
  const [displayNed, setDisplayNed] = useState<boolean>(false);
  const handleRequest = async () => {
    console.log('userId: ', userId);
    // const resp = await req();
    // if (resp.error) {
    //   setDisplayNed(true);
    //   setApiResp(resp);
    //   setTimeout(() => {
    //     setDisplayNed(false);
    //   }, 3500);
    //   return;
    // }
    // setApiResp(resp);
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
          {createBody || updateBody ? (
            <>
              <textarea
                value={createBody}
                defaultValue={JSON.stringify(bodyPlaceHolder, null, 2)}
                onChange={handleTextAreaChange}
                rows={6}
                cols={30}
              />
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
            </>
          ) : (reqType === 'PATCH' || reqType === 'DELETE') &&
            route === 'delete-an-amazon' ? (
            <>
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
            </>
          ) : (reqType === 'PATCH' || reqType === 'DELETE') &&
            route === 'delete-a-walmart' ? (
            <>
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
