import store from '@store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import Header from './index';

describe('Header component', () => {
  it('render the Header default props', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('User List')).toBeInTheDocument();
  });
});
