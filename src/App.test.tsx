import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './App';
import {fetchUsersApi} from './pages/users/api';

jest.mock('./pages/users/api');
const mockData = {
  results: [
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Ece',
        last: 'Yalçın',
      },
      location: {
        street: {
          number: 5004,
          name: 'Talak Göktepe Cd',
        },
        city: 'Uşak',
        state: 'Muş',
        country: 'Turkey',
        postcode: 29533,
        coordinates: {
          latitude: '68.8071',
          longitude: '113.0768',
        },
        timezone: {
          offset: '+3:00',
          description: 'Baghdad, Riyadh, Moscow, St. Petersburg',
        },
      },
      email: 'ece.yalcin@example.com',
      login: {
        uuid: '6dc884c9-3288-4197-9386-aa45b216f4e7',
        username: 'greenostrich704',
        password: 'lisa',
        salt: 'iFHeKB2n',
        md5: '25dd69db1a9d7f6ccc720f0dd5273125',
        sha1: 'f426c046dd61bb20006bd9a59d6fb179f6db2f34',
        sha256:
          '2d29dd75718bda1cc0c82bd0f60d0df3a5e266c364f7fbfee32d33b4202bfca6',
      },
      dob: {
        date: '1959-09-24T02:38:34.189Z',
        age: 63,
      },
      registered: {
        date: '2009-08-16T23:47:25.386Z',
        age: 13,
      },
      phone: '(114)-928-4878',
      cell: '(180)-326-0932',
      id: {
        name: '',
        value: null,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/69.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/69.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/69.jpg',
      },
      nat: 'TR',
    },
  ],
  info: {
    seed: 'fe06df6c01e3e328',
    results: 60,
    page: 1,
    version: '1.4',
  },
};
describe('App', () => {
  const mockStore = configureStore([]);
  test('Should load Application', () => {
    (fetchUsersApi as jest.Mock).mockReturnValue(
      Promise.resolve(mockData.results)
    );
    const mockedStore = mockStore({
      loader: {isAppLoading: true},
      users: {userDate: mockData.results},
    });
    render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    );
    const loaderWrapper = screen.getAllByTestId('loader-wrapper')[0];
    expect(loaderWrapper).toBeInTheDocument();
  });

  test('Should render dasboard', () => {
    const mockedStore = mockStore({
      loader: {isAppLoading: false},
      users: {userData: mockData.results},
    });
    (fetchUsersApi as jest.Mock).mockReturnValue(
      Promise.resolve(mockData.results)
    );
    render(
      <Provider store={mockedStore}>
        <App />
      </Provider>
    );
  });
});
