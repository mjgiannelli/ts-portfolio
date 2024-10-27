import { Dispatch, SetStateAction } from 'react';
import { API } from '../../api/api';
import Route from '../route';

export interface ApiRoutesProps {
  token: string;
  nedCB: Dispatch<SetStateAction<boolean>>;
}

const ApiRoutes: React.FC<ApiRoutesProps> = ({ token, nedCB }) => {
  const handleExecuteBtn = async () => {
    const resp = await API.getAllUsers(token);
    if (resp.error) {
      nedCB(true);
      setTimeout(() => {
        nedCB(false);
      }, 3500);
    }
  };
  return (
    <div>
      <Route
        descrption="Get all users in database."
        url="https://portfolio-backend-ahyh.onrender.com/users"
        reqType="GET"
        response={{
          data: {
            name: 'string',
            username: 'string',
            customerId: 'string',
            roleId: 'string',
          },
        }}
        req={() => handleExecuteBtn()}
      />
    </div>
  );
};

export default ApiRoutes;
