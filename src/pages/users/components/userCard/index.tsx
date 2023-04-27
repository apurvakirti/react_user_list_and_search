/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import {IUserData} from '@common/interfaces';

interface userCardProps {
  user: IUserData;
  handleUserDetails: (user: IUserData) => void;
}
function UserCard({user, handleUserDetails}: userCardProps) {
  return (
    <div
      data-testid='user-card'
      className='user-card'
      key={user.email}
      onClick={() => handleUserDetails(user)}>
        <div className='card-image'>

      <img src={user.picture.large} alt='User' />
        </div>
      <div className='card-details'>
        <h4 className='title'>
          {user.name.first} {user.name.last}
        </h4>
        <div className='details'>
        <p className='username uuid ellipsis'>{user.login.uuid}</p>
        <p className='username ellipsis'>{user.phone}</p>
        <p className='username ellipsis'>{user.email}</p>
        <p className='description ellipsis'>{user?.location.city}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
