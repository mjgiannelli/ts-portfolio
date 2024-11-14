import { useEffect, useState } from 'react';
import { API } from '../../api/api';
import Route from '../route/route';
import './api-routes.scss';
import { CreateUserBodyDTO } from '../../api/api.dto';

export interface ApiRoutesProps {
  token: string;
}

const ApiRoutes: React.FC<ApiRoutesProps> = ({ token }) => {
  const [activeReq, setActiveReq] = useState<string>('get');
  const [activeRoute, setActiveRoute] = useState<string>('get-all');
  const [createUserBody, setCreateUserBody] = useState<CreateUserBodyDTO>({
    name: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);

  return (
    <div className="requests">
      <div className="tabs">
        <h1
          className={activeReq === 'get' ? 'active-req' : ''}
          onClick={() => {
            setActiveReq('get');
            setActiveRoute('get-all');
          }}
        >
          GET
        </h1>
        <h1
          className={activeReq === 'post' ? 'active-req' : ''}
          onClick={() => {
            setActiveReq('post');
            setActiveRoute('create-an-amazon');
          }}
        >
          POST
        </h1>
        <h1
          className={activeReq === 'patch' ? 'active-req' : ''}
          onClick={() => {
            setActiveReq('patch');
            setActiveRoute('update-an-amazon');
          }}
        >
          PATCH
        </h1>
        <h1
          className={activeReq === 'delete' ? 'active-req' : ''}
          onClick={() => {
            setActiveReq('delete');
            setActiveRoute('delete-an-amazon');
          }}
        >
          DELETE
        </h1>
      </div>
      <div className="routes">
        <>
          {activeReq === 'get' ? (
            <>
              <div className="route-headers">
                <h1
                  className={activeRoute === 'get-all' ? 'active-route' : ''}
                  onClick={() => setActiveRoute('get-all')}
                >
                  Get All Users
                </h1>
                <h1
                  className={
                    activeRoute === 'get-all-amazon' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('get-all-amazon')}
                >
                  Get All Amazon Users
                </h1>
                <h1
                  className={
                    activeRoute === 'get-all-walmart' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('get-all-walmart')}
                >
                  Get All Walmart Users
                </h1>
                <h1
                  className={
                    activeRoute === 'get-an-amazon' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('get-an-amazon')}
                >
                  Get One Amazon User
                </h1>
                <h1
                  className={
                    activeRoute === 'get-a-walmart' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('get-a-walmart')}
                >
                  Get One Walmart User
                </h1>
              </div>
              {activeRoute === 'get-all' ? (
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
              ) : activeRoute === 'get-all-amazon' ? (
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
                  req={() => API.getAllUsers(token, 'amazon')}
                  className="req-container"
                />
              ) : activeRoute === 'get-all-walmart' ? (
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
                  req={() => API.getAllUsers(token, 'walmart')}
                  className="req-container"
                />
              ) : activeRoute === 'get-an-amazon' ? (
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
                  req={() => API.getUserById(token, 'amazon')}
                  className="req-container"
                />
              ) : activeRoute === 'get-a-walmart' ? (
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
                  req={() => API.getUserById(token, 'walmart')}
                  className="req-container"
                />
              ) : null}
            </>
          ) : activeReq === 'post' ? (
            <>
              <div className="route-headers">
                <h1
                  className={
                    activeRoute === 'create-an-amazon' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('create-an-amazon')}
                >
                  Create Amazon User
                </h1>
                <h1
                  className={
                    activeRoute === 'create-a-walmart' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('create-a-walmart')}
                >
                  Create Walmart User
                </h1>
              </div>
              {activeRoute === 'create-an-amazon' ? (
                <Route
                  description="Create an amazon user."
                  url="https://portfolio-backend-ahyh.onrender.com/users"
                  reqType="POST"
                  createBody={{
                    name: 'string',
                    username: 'string',
                    password: 'string',
                  }}
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
                  req={() => API.createUser(token, 'amazon', createUserBody)}
                  className="req-container"
                />
              ) : activeRoute === 'create-a-walmart' ? (
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
                  req={() => API.createUser(token, 'walmart', createUserBody)}
                  className="req-container"
                />
              ) : null}
            </>
          ) : activeReq === 'patch' ? (
            <>
              <div className="route-headers">
                <h1
                  className={
                    activeRoute === 'update-an-amazon' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('update-an-amazon')}
                >
                  Update Amazon User
                </h1>
                <h1
                  className={
                    activeRoute === 'update-a-walmart' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('update-a-walmart')}
                >
                  Update Walmart User
                </h1>
              </div>
            </>
          ) : activeReq === 'delete' ? (
            <>
              <div className="route-headers">
                <h1
                  className={
                    activeRoute === 'delete-an-amazon' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('delete-an-amazon')}
                >
                  Delete Amazon User
                </h1>
                <h1
                  className={
                    activeRoute === 'delete-a-walmart' ? 'active-route' : ''
                  }
                  onClick={() => setActiveRoute('delete-a-walmart')}
                >
                  Delete Walmart User
                </h1>
              </div>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default ApiRoutes;
