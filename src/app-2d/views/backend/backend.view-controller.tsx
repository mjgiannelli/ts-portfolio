import { useEffect, useState } from 'react';
import { wakeUpApi } from '../../../utilties/utils';

const BackendViewController = () => {
  const [displayNed, setDisplayNed] = useState<boolean>(false);
  const [apiAwake, setApiAwake] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const roles = ['admin', 'user'];
  const customers = ['amazon', 'walmart'];

  const handleAwakeApiClick = async () => {
    setLoading(true);
    const resp = await wakeUpApi();
    if (resp) {
      setApiAwake(true);
    }
  };

  useEffect(() => {
    if (apiAwake) {
      setLoading(false);
    }
  }, [apiAwake]);

  return {
    displayNed,
    handleAwakeApiClick,
    loading,
    apiAwake,
    roles,
    customers,
  };
};

export default BackendViewController;
