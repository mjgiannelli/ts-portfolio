import { useEffect, useState } from 'react';
import { API } from '../../api/api';
import Route from '../route/route';
import './api-routes.scss';

export interface ApiRoutesProps {
  token: string;
}

const ApiRoutes: React.FC<ApiRoutesProps> = ({ token }) => {
  const [activeReq, setActiveReq] = useState<string>('get');
  const [error, setError] = useState<boolean>(false);

  return (
    <div className="requests">
      <div className="tabs">
        <h1
          className={activeReq === 'get' ? 'active-req' : ''}
          onClick={() => setActiveReq('get')}
        >
          GET
        </h1>
        <h1
          className={activeReq === 'post' ? 'active-req' : ''}
          onClick={() => setActiveReq('post')}
        >
          POST
        </h1>
        <h1
          className={activeReq === 'patch' ? 'active-req' : ''}
          onClick={() => setActiveReq('patch')}
        >
          PATCH
        </h1>
        <h1
          className={activeReq === 'delete' ? 'active-req' : ''}
          onClick={() => setActiveReq('delete')}
        >
          DELETE
        </h1>
      </div>
      <div className="routes">
        {activeReq === 'post' ? (
          <div>Post routes</div>
        ) : activeReq === 'patch' ? (
          <div>Patch routes</div>
        ) : activeReq === 'delete' ? (
          <div>Delete routes</div>
        ) : (
          <>
            <Route
              description="Get all users in database."
              url="https://portfolio-backend-ahyh.onrender.com/users"
              reqType="GET"
              response={{
                data: [
                  {
                    name: 'string',
                    username: 'string',
                    customerId: 'string',
                    roleId: 'string',
                  },
                ],
              }}
              req={() => API.getAllUsers(token)}
              className="req-container"
            />
            <Route
              description="Get all Amazon users in database."
              url="https://portfolio-backend-ahyh.onrender.com/users"
              reqType="GET"
              response={{
                data: [
                  {
                    name: 'string',
                    username: 'string',
                    customerId: 'string',
                    roleId: 'string',
                  },
                ],
              }}
              req={() => API.getAllAmazonUsers(token)}
              className="req-container"
            />
            <Route
              description="Get all Walmart users in database."
              url="https://portfolio-backend-ahyh.onrender.com/users"
              reqType="GET"
              response={{
                data: [
                  {
                    name: 'string',
                    username: 'string',
                    customerId: 'string',
                    roleId: 'string',
                  },
                ],
              }}
              req={() => API.getAllWalmartUsers(token)}
              className="req-container"
            />
            <Route
              description="Get an Amazon user from the database."
              url="https://portfolio-backend-ahyh.onrender.com/users/:id"
              reqType="GET"
              response={{
                data: {
                  name: 'string',
                  username: 'string',
                  customerId: 'string',
                  roleId: 'string',
                },
              }}
              req={() => API.getAmazonUserById(token)}
              className="req-container"
            />
            <Route
              description="Get an Walmart user from the database."
              url="https://portfolio-backend-ahyh.onrender.com/users/:id"
              reqType="GET"
              response={{
                data: {
                  name: 'string',
                  username: 'string',
                  customerId: 'string',
                  roleId: 'string',
                },
              }}
              req={() => API.getWalmartUserById(token)}
              className="req-container"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ApiRoutes;
