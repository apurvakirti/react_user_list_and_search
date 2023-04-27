/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable prefer-promise-reject-errors */
import {IUserData} from '@common/interfaces';
import axios from '@core/services/axiosInstance';
import MockAdapter from 'axios-mock-adapter';

import {fetchUsersApi} from '.';

const mock = new MockAdapter(axios);

describe('Auth API Testing', () => {
  test('Get users list success', async () => {
    mock.onGet('https://randomuser.me/api/?results=60').reply(
      () =>
        new Promise((resolve) => {
          resolve([200, {message: 'api called'}]);
        })
    );
    const res: IUserData[] = await fetchUsersApi();
  });
  test('Get users list failure', async () => {
    mock.onGet('https://randomuser.me/apiii/?results=60').reply(
      () =>
        new Promise((resolve, reject) => {
          reject([500, {message: 'error'}]);
        })
    );
    const res: any = await fetchUsersApi();
  });
});
