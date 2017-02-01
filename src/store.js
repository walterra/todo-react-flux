import Dispatcher from './Dispatcher';

export default function(action) {
  var dispatcher = Dispatcher('changed');

  var todos = [];

  var triggerChange = function(f) {
    return function(data) {
      f(data);
      dispatcher('changed');
    };
  };

  action.on('item-add', triggerChange(function(text) {
    todos.push({
      text: text,
      indent: 0,
      done: false
    });
  }));

  action.on('item-remove', triggerChange(function(key) {
    todos.splice(key, 1);
  }));

  action.on('item-move', triggerChange(function(d) {
    var items = todos.splice(d.from, 1);
    todos.splice(d.to, 0, items[0]);
  }));

  action.on('item-toggle', triggerChange(function(key) {
    todos[key].done = !todos[key].done;
  }));

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
