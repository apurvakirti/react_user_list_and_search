import Header from '@common/components/header';
import Helmet from '@common/components/utils/Helmet';
import {IUserData} from '@common/interfaces';
import {
  faEnvelope,
  faHouse,
  faPersonHalfDress,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fetchUsersApi} from '@pages/users/api';
import {RootState, dispatch} from '@store';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import UserCard from '../components/userCard';
import {userActions} from '../store/reducer';
import './index.scss';

function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState<any>(null);
  const {userData} = useSelector((state: RootState) => state.users);
  const filteredUsers =
    userData &&
    userData.length &&
    userData.filter((user: any) => {
      return (
        user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.login.uuid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleUserDetails = (user: any) => {
    setUserDetails(user);
  };

  useEffect(() => {
    fetchUsersApi().then((res: IUserData[]) => {
      if (res) {
        dispatch(userActions.setUserData([...res]));
      }
    });
  }, []);

  return (
    <>
      <Helmet title='User Dashboard' />
      <div className='container' data-testid='userDashboard'>
        <Header />
        {userData && userData.length ? (
          <div className='search-box'>
            <input
              data-testid='user-search'
              type='text'
              placeholder='Search users...'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        ) : null}
        {filteredUsers && filteredUsers.length ? (
          <div className='user-list'>
            {filteredUsers.map((user) => (
              <UserCard
                key={user.email}
                user={user}
                handleUserDetails={handleUserDetails}
              />
            ))}
          </div>
        ) : (
          <div className='no-data' data-testid='no-data'>
            No Data Found
          </div>
        )}

        <div
          id='modal'
          className='modal'
          style={{display: userDetails ? 'block' : 'none'}}>
          <div className='modal-content'>
            <span
              className='close'
              data-testid='modal-close'
              onClick={() => setUserDetails(null)}>
              &times;
            </span>
            <div className='modal-flex-container'>
              <div className='modal-image'>
                <img src={userDetails?.picture.large} alt='User Image' />
              </div>
              <div className='modal-text'>
                <p className='title'>
                  {userDetails?.name.first} {userDetails?.name.last}
                </p>
                <p className='sub-title'>
                  <FontAwesomeIcon
                    icon={faPersonHalfDress}
                    style={{color: 'grey'}}
                    className='details-icon'
                  />{' '}
                  {userDetails?.gender}
                </p>
                <p className='sub-title modal-email'>
                  <FontAwesomeIcon icon={faEnvelope} style={{color: 'grey'}} className='details-icon'/>{' '}
                  {userDetails?.email}
                </p>
                <p className='sub-title'>
                  <FontAwesomeIcon icon={faPhone} style={{color: 'grey'}} className='details-icon' />{' '}
                  {userDetails?.phone}
                </p>

                <p>
                  <FontAwesomeIcon icon={faHouse} style={{color: 'grey'}} className='details-icon'/>{' '}
                  {userDetails?.location.timezone.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
