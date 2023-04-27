import {IUserData} from '@common/interfaces';
import {get} from '@core/services/httpMethods';

export const fetchUsersApi = async () => {
  const response = await get('/?results=60');
  return response.results as IUserData[];
};
