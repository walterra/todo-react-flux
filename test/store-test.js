import {dispatch} from 'd3-dispatch';
import store from '../src/store';

import test from 'tape';

export default test('store.', function(t) {
  var actions = dispatch(
    'item-add',
    'item-remove'
  );

  var s;

  t.plan(3);

  t.doesNotThrow(function() {
    s = new store(actions);
  }, 'Initialize store.');

  var counter = 0;
  s.on('changed', function() {
    counter++;
    var state = s.getState();
    switch(counter) {
    case 1:
      t.deepEqual(state, ['todo'], 'Add first item.');
      break;
    case 2:
      t.deepEqual(state, ['todo', 'todo'], 'Add second item.');
      break;
    default:
    }
  });

  actions.call('item-add');
  actions.call('item-add');
});
