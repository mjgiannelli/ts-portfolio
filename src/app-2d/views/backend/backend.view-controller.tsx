import { useEffect, useState } from 'react';
import { API } from '../../api/api';
import { DecodedTokenDTO } from '../../../utilties/dtos/auth.dtos';
import auth from '../../../utilties/auth';

const BackendViewController = () => {
  const [apiAwake, setApiAwake] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [dropDownSelection, setDropDownSelection] = useState({
    role: 'user',
    customer: 'amazon',
  });
  const [message, setMessage] = useState<string>('');
  const [tokenClaims, setTokenClaims] = useState<DecodedTokenDTO | null>({
    id: '67143f2ef2d2934ae81d9c34',
    username: 'amazonuser',
    roleId: '671420d944fa12822c588720',
    customerId: '67143e89f2d2934ae81d9c2e',
    name: 'amazon user',
    iat: 1730585374,
    exp: 0,
  });
  const [tokenStr, setTokenStr] = useState<string | null>(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTQzZjJlZjJkMjkzNGFlODFkOWMzNCIsInVzZXJuYW1lIjoiYW1hem9udXNlciIsInJvbGVJZCI6IjY3MTQyMGQ5NDRmYTEyODIyYzU4ODcyMCIsImN1c3RvbWVySWQiOiI2NzE0M2U4OWYyZDI5MzRhZTgxZDljMmUiLCJuYW1lIjoiYW1hem9uIHVzZXIiLCJpYXQiOjE3MzA1ODUxMTl9.jSnAV7Skz8VhocYGEIbVugVn3NWGVBDD025esH4Dm0M',
  );

  const roles = ['admin', 'user'];
  const customers = ['amazon', 'walmart'];

  const handleAwakeApiClick = async () => {
    setLoading(true);
    setMessage('Please allow up to 5 mins. Server needs to wake up.');
    const resp = await API.wakeUpApi();
    if (resp) {
      setApiAwake(true);
    }
  };

  const handleDropDownSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMessage('');
    setDropDownSelection({
      ...dropDownSelection,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetAccessToken = async () => {
    setLoading(true);
    const username = dropDownSelection.customer + dropDownSelection.role;
    const resp = await API.login(username);
    if (resp.token) {
      setTokenStr(resp.token);
      const decodedToken = auth.decodeToken(resp.token);
      setTokenClaims(decodedToken);
    }
  };

  const handleChangeUserBtn = () => {
    setLoading(true);
    setTokenClaims(null);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (apiAwake) {
      setMessage('');
      setLoading(false);
    }
  }, [apiAwake]);

  useEffect(() => {
    if (tokenClaims) {
      setLoading(false);
    }
  }, [tokenClaims]);

  return {
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
  };
};

export default BackendViewController;
