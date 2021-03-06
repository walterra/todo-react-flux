import Dispatcher from '../src/dispatcher';
import Store from '../src/store';

import test from 'tape';

export default test('store.', function(t) {
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

  var store;
  var state;

  t.plan(8);

  t.doesNotThrow(function() {
    store = Store(action, true);
    state = store.getState();
  }, 'Initialize store.');

  t.equal(state.length, 0, 'Initial state is empty.');

  var counter = 0;
  store.on('changed', function(state) {
    counter++;
    switch(counter) {
    case 1:
      t.equal(state.length, 1, 'Add first item.');
      break;
    case 2:
      t.equal(state.length, 2, 'Add second item.');
      break;
    case 3:
      t.equal(state[0].text, 'My second item.', 'Removed first item.');
      break;
    case 5:
      t.equal(state[0].text, 'Another item.', 'Moved an item.');
      t.equal(state[1].done, false, 'Item not done.');
      break;
    case 6:
      t.equal(state[1].done, true, 'Item done.');
      break;
    default:
    }
  });

  action('item-add', 'My first item.');
  action('item-add', 'My second item.');
  action('item-remove', 0);
  action('item-add', 'Another item.');
  action('item-move', {
    from: 1,
    to: 0
  });
  action('item-toggle', 1);
});
