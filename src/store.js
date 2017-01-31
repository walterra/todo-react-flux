import {dispatch} from 'd3-dispatch';

export default function(actions) {
  var dispatcher = dispatch('changed');

  var todos = [];

  actions.on('item-add', function() {
    todos.push('todo');
    dispatcher.call('changed');
  });

  actions.on('item-remove', function() {
    todos.pop();
    dispatcher.call('changed');
  });

  var store = {
    getState: function() {
      return todos;
    },
    // http://stackoverflow.com/a/38335479/2266116
    on: function() {
      var value = dispatcher.on.apply(dispatcher, arguments);
      return value === dispatcher ? store : value;
    }
  };

  return store;
}
