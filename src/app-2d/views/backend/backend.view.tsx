import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Newman from '../../components/newman/newman';
import BackendViewController from './backend.view-controller';
import './backend.view.scss';
import { capitalizeFirstLetter } from '../../../utilties/utils';
import ApiRoutes from '../../components/api-routes/api-routes';

const Backend: React.FC = () => {
  const {
    displayNed,
    handleAwakeApiClick,
    loading,
    apiAwake,
    roles,
    customers,
    handleDropDownSelection,
    handleGetAccessToken,
    tokenClaims,
    message,
    handleChangeUserBtn,
    tokenStr,
    setDisplayNed,
  } = BackendViewController();
  return (
    <div className="backend-container">
      {displayNed ? (
        <div className="ned-container">
          <Newman />
        </div>
      ) : loading ? (
        <div className="loading">
          {message ? <p>{message}</p> : null}
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      ) : tokenClaims ? (
        <div>
          <button onClick={handleChangeUserBtn}>Change User</button>
          <p>Name: {tokenClaims.name}</p>
          <p>Username: {tokenClaims.username}</p>
          <ApiRoutes token={tokenStr as string} nedCB={setDisplayNed} />
        </div>
      ) : apiAwake ? (
        <div>
          <div className="dropdowns">
            <div className="customer-dd">
              <label htmlFor="customer">Customer</label>
              <select name="customer" onChange={handleDropDownSelection}>
                <option value="">---</option>
                {customers.map((customer: string, index: number) => {
                  return (
                    <option key={`customer-${index}`} value={customer}>
                      {capitalizeFirstLetter(customer)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="role-dd">
              <label htmlFor="role">Role</label>
              <select name="role" onChange={handleDropDownSelection}>
                <option value="">---</option>
                {roles.map((role: string, index: number) => {
                  return (
                    <option key={`role-${index}`} value={role}>
                      {capitalizeFirstLetter(role)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button onClick={handleGetAccessToken}>Get Access Token</button>
        </div>
      ) : (
        <div>
          <button onClick={handleAwakeApiClick}>Wake up API</button>
        </div>
      )}
    </div>
  );
};

export default Backend;
