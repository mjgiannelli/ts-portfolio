import { useEffect, useState } from 'react';
import { API } from '../../api/api';
import { DecodedTokenDTO } from '../../../utilties/dtos/auth.dtos';
import auth from '../../../utilties/auth';

const BackendViewController = () => {
  const [displayNed, setDisplayNed] = useState<boolean>(false);
  const [apiAwake, setApiAwake] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dropDownSelection, setDropDownSelection] = useState({
    role: '',
    customer: '',
  });
  const [message, setMessage] = useState<string>('');
  const [tokenClaims, setTokenClaims] = useState<DecodedTokenDTO | null>(null);
  const [tokenStr, setTokenStr] = useState<string | null>(null);

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
  };
};

export default BackendViewController;
