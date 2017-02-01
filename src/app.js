import Dispatcher from './dispatcher';
import Store from './store';

export default function(id) {
  var action = Dispatcher(
    'item-add',
    'item-remove'
  );

  var store = new Store(action);

  store.on('changed', function() {
    console.log('todos', store.getState());
  });

  action('item-add');
  action('item-add');
}
