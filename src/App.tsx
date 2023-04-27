import UserDashboard from '@pages/users/container';
import Loader from '@shared/components/loader/index';
import {RootState} from '@store';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import './App.scss';

export default function App() {
  const {
    loader: {isAppLoading},
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (isAppLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isAppLoading]);
  return (
    <>
      <div className='main-container'>
        <UserDashboard />
      </div>
      {isAppLoading && (
        <div className='app-loader'>
          <Loader />
        </div>
      )}
    </>
  );
}
