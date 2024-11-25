import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackendViewController from './backend.view-controller';
import './backend.view.scss';
import { capitalizeFirstLetter } from '../../../utilties/utils';
import ApiRoutes from '../../components/api-routes/api-routes';

const Backend: React.FC = () => {
  const {
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
  } = BackendViewController();
  return (
    <div className="backend-container">
      {loading ? (
        <div id="wake-up-loading" className="loading">
          {message ? <p id="wake-up-message">{message}</p> : null}
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      ) : tokenClaims ? (
        <div className="all-requests">
          <button onClick={handleChangeUserBtn}>Change User</button>
          <p className="name">Name: {tokenClaims.name}</p>
          <p className="username">Username: {tokenClaims.username}</p>
          <ApiRoutes token={tokenStr as string} />
        </div>
      ) : apiAwake ? (
        <>
          <div className="dropdowns">
            <div className="customer-dd">
              <label htmlFor="customer">Customer: </label>
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
              <label htmlFor="role">Role: </label>
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
          <div className="token-btn-container">
            <button id="get-token-btn" onClick={handleGetAccessToken}>
              Get Access Token
            </button>
          </div>
        </>
      ) : (
        <div className="wake-up-container">
          <button id="wake-up-btn" onClick={handleAwakeApiClick}>
            Wake up API
          </button>
        </div>
      )}
    </div>
  );
};

export default Backend;
