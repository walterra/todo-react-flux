import Dispatcher from './Dispatcher';

export default (action, reset) => {
  const dispatcher = Dispatcher('changed');

  let todos = [];

  const subscriber = (a, c) => {
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
      collapsable: false,
      collapsed: false,
      show: true,
      hover: false
    });
  });

  subscriber('item-remove.store', key => {
    todos.splice(key, 1);
  });

  subscriber('item-move.store', d => {
    let items = todos.splice(d.from, 1);
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

  var checkTree = () => {
    todos = todos.map((todo, i) => {
      let currentItem = todo;
      let nextItem = todos[i + 1];
      
      currentItem.collapsable = (
        typeof nextItem !== 'undefined' &&
        nextItem.indent > currentItem.indent
      ) ? true : false;
      
      if (!currentItem.collapsable) {
        currentItem.collapsed = false;
      }

      return currentItem;
    });
  };

  var collapse = key => {
    if (todos[key].collapsable) {
      todos[key].collapsed = !todos[key].collapsed;
      // show/hide the subtree
      for (let i = (key + 1); i < todos.length; i++) {
        let todo = todos[i];
        if (todo.indent > todos[key].indent) {
          todo.show = (todos[key].collapsed) ? false : true;
          if (todo.collapsable) {
            todo.collapsed = todos[key].collapsed;
          }
        } else {
          break;
        }
      }
    }
  };
  subscriber('item-collapse.store', collapse);

  action.on('item-indent.store', d => {
    // the first item doesn't support indentation
    if (d.key === 0) {
      return;
    }

    let currentItem = todos[d.key];
    let previousItem = todos[d.key - 1];
    let changed = false;
    // indentation with support for indenting subtrees
    if (d.direction === 'down' && currentItem.indent <= previousItem.indent) {
      currentItem.indent++;
      for (let i = (d.key + 1); i < todos.length; i++) {
        let todo = todos[i];
        if (todo.indent >= currentItem.indent) {
          todo.indent++;
        } else {
          break;
        }
      }
      // TODO check if the item is now part of another hidden subtree
      changed = true;
    } else if (d.direction === 'up' && currentItem.indent > 0) {
      currentItem.indent--;
      for (let i = (d.key + 1); i < todos.length; i++) {
        let todo = todos[i];
        if (todo.indent > currentItem.indent) {
          todo.indent--;
        } else {
          break;
        }
      }
      // TODO check collapsable status

      changed = true;
    }

    if (changed) {
      checkTree();
      dispatcher('changed', todos);
    }
  });

  action.on('item-update.store', d => {
    todos[d.key].text = d.text;
    dispatcher('changed', todos);
  });

  const store = {
    getState: function() {
      return todos;
    },
    // http://stackoverflow.com/a/38335479/2266116
    on: function() {
      let value = dispatcher.on.apply(dispatcher, arguments);
      return value === dispatcher ? store : value;
    }
  };

  if (typeof(Storage) !== 'undefined' && !reset) {
    store.on('changed.localStorage', (state) => {
      localStorage.setItem('todos', JSON.stringify(state));
    });
    try {
      let localTodos = JSON.parse(localStorage.getItem('todos'));
      if (Array.isArray(localTodos)) {
        todos = localTodos;
      }
    } catch (e) {}
  }

  return store;
};
