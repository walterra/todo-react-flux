import React from 'react';
import ReactDOM from 'react-dom';

import { TodoComponent } from './view.jsx';

export default (id, action, store) => {
  const root = document.querySelector(id);

  const render = state => {
    ReactDOM.render(
      <TodoComponent action={action} todos={state} />,
      root
    );
  };

  store.on('changed.view', render);

  // trigger the first initial rendering manually
  render(store.getState());
};



