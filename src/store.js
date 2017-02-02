import Dispatcher from './Dispatcher';

export default (action) => {
  var dispatcher = Dispatcher('changed');

  var todos = [];

  var subscriber = (a, c) => {
    action.on(a, (data) => {
      c(data);
      dispatcher('changed', todos);
    });
  };

  subscriber('item-add.store', (text) => {
    todos.push({
      text: text,
      indent: 0,
      done: false,
      collapsed: false,
      show: true,
      hover: false
    });
  });

  subscriber('item-remove.store', key => {
    todos.splice(key, 1);
  });

  subscriber('item-move.store', d => {
    var items = todos.splice(d.from, 1);
    todos.splice(d.to, 0, items[0]);
  });

  subscriber('item-toggle.store', key => {
    todos[key].done = !todos[key].done;
  });

  subscriber('item-focus.store', key => {
    todos.map(
      todo => todo.hover = false
    );
    todos[key].hover = true;
  });

  subscriber('item-blur.store', key => {
    todos[key].hover = false;
  });

  action.on('item-indent.store', d => {
    // the first item doesn't support indentation
    if (d.key === 0) {
      return;
    }

    // check if the position allows indentation
    var currentItem = todos[d.key];
    var previousItem = todos[d.key - 1];
    
    console.log('indent', currentItem.indent, previousItem.indent);

    if (currentItem.indent === previousItem.indent && d.direction === 'down') {
      console.log('down!');
      currentItem.indent++;
      dispatcher('changed', todos);
    } else if (currentItem.indent < previousItem.indent && d.direction === 'down') {
      currentItem.indent = previousItem.indent;
      dispatcher('changed', todos);
    } else if (currentItem.indent === (previousItem.indent + 1) && d.direction === 'up') {
      console.log('up!');
      currentItem.indent--;
      dispatcher('changed', todos);
    }
  });

  action.on('item-update.store', d => {
    todos[d.key].text = d.text;
    dispatcher('changed', todos);
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

  if (typeof(Storage) !== 'undefined') {
    store.on('changed.localStorage', (state) => {
      localStorage.setItem('todos', JSON.stringify(state));
    });
    try {
        var localTodos = JSON.parse(localStorage.getItem('todos'));
        if (Array.isArray(localTodos)) {
          todos = localTodos;
          dispatcher('changed', todos);
        }
    } catch (e) {
      console.log('error', e);
    }
  }

  return store;
}
