import Dispatcher from './dispatcher';
import Store from './store';
import View from './view';

export default id => {
  const action = Dispatcher(
    'item-add',
    'item-remove',
    'item-move',
    'item-toggle',
    'item-indent',
    'item-focus',
    'item-blur',
    'item-update',
    'item-collapse',
    'item-focus-remove',
    'item-blur-remove'
  );

  const store = Store(action);

  View(id, action, store);

  if (store.getState().length === 0) {
    // This just demonstrates that we can trigger actions
    // programmatically instead of via the GUI only
    action('item-add', 'Some Todo.');
    action('item-add', 'Another Todo.');
  }
};
