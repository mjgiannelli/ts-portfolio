import Route from '../route';

const ApiRoutes = () => {
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
      />
    </div>
  );
};

export default ApiRoutes;
