import React from 'react';

export class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos;
    let action = this.props.action;

    const actionFactory = actionName => {
      return (e) => {
        action(actionName, parseInt(e.target.dataset.id));
        e.preventDefault();
      };
    };

    const indent = e => {
      console.log('indent');
      action('item-indent', {
        key: parseInt(e.target.dataset.id),
        direction: 'down'
      });
    };

    const classNames = (todo) => {
      let names = [];
      if (todo.hover) {
        names.push('hover');
      }
      if (todo.indent > 0) {
        names.push('indent');
      }
      return names.join(' ');
    };

    const text = (todo, i) => {
      let inputState;

      const submit = (e) => {
        action('item-edit', i);
        e.preventDefault();
      };

      return <input 
        className={(todo.done) ? 'done' : ''}
        type="text"
        value={todo.text}
        ref={input => inputState = input} 
        onChange={() => {
          action('item-update', {
            key: i,
            text: inputState.value
          });
        }} />;
    };

    const items = todos.map(
      (todo, i) => 
        <li 
          key={i}
          data-id={i}
          onMouseEnter={actionFactory('item-focus')}
          onMouseLeave={actionFactory('item-blur')}
          className={classNames(todo)}
        >
          <input
            data-id={i}
            type="checkbox"
            checked={todo.done}
            onChange={actionFactory('item-toggle')} />

          {text(todo, i)}

          {(todo.hover) ? 
            <span>
            <i
              data-id={i}
              onClick={indent}
              className="fa fa-indent"
              aria-hidden="true"></i>
            <i
              data-id={i}
              onClick={actionFactory('item-remove')}
              className="fa fa-trash-o" 
              aria-hidden="true"></i>
            </span>
            : ''
          }
        </li>
    );

    const submit = (e) => {
      if (this.input.value.length > 0) {
        action('item-add', this.input.value);
        this.input.value = '';
      }
      e.preventDefault();
    };

    return (
      <div className="todos">
        <ul>
          {items}
        </ul>
        <form onSubmit={submit}>
          <input 
            placeholder="enter task"
            type="text" 
            ref={input => this.input = input} 
          />
          <button type="submit">add</button>
        </form>
      </div>
    );
  }
}
