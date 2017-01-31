import {dispatch} from 'd3-dispatch';
import store from './store';

export default function(id) {
  var actions = dispatch(
    'item-add',
    'item-remove'
  );

  var s = new store(actions);

  s.on('changed', function() {
    console.log('todos', s.getState());
  });

  actions.call('add');
  actions.call('add');

}
