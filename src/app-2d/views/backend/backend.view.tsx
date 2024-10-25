import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Newman from '../../components/newman/newman';
import BackendViewController from './backend.view-controller';
import './backend.view.scss';
import { capitalizeFirstLetter } from '../../../utilties/utils';

const Backend: React.FC = () => {
  const {
    displayNed,
    handleAwakeApiClick,
    loading,
    apiAwake,
    roles,
    customers,
  } = BackendViewController();
  return (
    <div className="backend-container">
      {displayNed ? (
        <div className="ned-container">
          <Newman />
        </div>
      ) : loading ? (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      ) : apiAwake ? (
        <div>
          <button>Get Access Token</button>
          <div className="dropdowns">
            <div className="role-dd">
              <label htmlFor="role">Role</label>
              <select name="role">
                <option value="select">---</option>
                {roles.map((role: string, index: number) => {
                  return (
                    <option key={`role-${index}`} value={role}>
                      {capitalizeFirstLetter(role)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="customer-dd">
              <label htmlFor="customer">Customer</label>
              <select name="customer">
                <option value="select">---</option>
                {customers.map((customer: string, index: number) => {
                  return (
                    <option key={`customer-${index}`} value={customer}>
                      {capitalizeFirstLetter(customer)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
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
