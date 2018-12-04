import React from 'react';

export class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  actionFactory(actionName, id) {
    return (e) => {
      this.props.action(actionName, parseInt(id));
      e.preventDefault();
    };
  }

  indent(id, direction) {
    this.props.action('item-indent', {
      key: parseInt(id),
      direction: direction
    });
  }

  classNames(todo) {
    let names = [];
    if (todo.hover) {
      names.push('hover');
    }
    if (!todo.show) {
      names.push('hide');
    }
    return names.join(' ');
  }

  text(todo, i) {
    const action = this.props.action;
    let inputState;

    return <input 
      key={'text_' + i}
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
  }

  render() {
    const todos = this.props.todos;
    const action = this.props.action;

    const items = todos.map(
      (todo, i) => {
        const style = {
          paddingLeft: (todo.indent * 20) + 'px'
        };

        return <li 
          key={'li_' + i}
          onMouseEnter={this.actionFactory('item-focus', i)}
          onMouseLeave={this.actionFactory('item-blur', i)}
          className={this.classNames(todo)}
          style={style}
        >
          {(todo.collapsable) ?
            <i
              key={'collapse_' + i}
              onClick={this.actionFactory('item-collapse', i)}
              className={(todo.collapsed) ? 'collapse fa fa-angle-right' : 'collapse fa fa-angle-down'} />
            : <span className="collapse"></span>
          }
          <i
            key={'check_' + i}
            onClick={this.actionFactory('item-toggle', i)}
            className={(todo.done) ? 'fa fa-check-square' : 'fa fa-square-o'}
            aria-hidden="true"></i>

          {this.text(todo, i)}

          {todo.hover &&
            <span className="options">
              <i
                key={'outdent_' + i}
                onClick={this.indent.bind(this, i, 'up')}
                className="fa fa-outdent"
                aria-hidden="true"></i>
              <i
                key={'indent_' + i}
                onClick={this.indent.bind(this, i, 'down')}
                className="fa fa-indent"
                aria-hidden="true"></i>
              <i
                key={'delete_'  + i}
                onClick={this.actionFactory('item-remove', i)}
                onMouseEnter={this.actionFactory('item-focus-remove', i)}
                onMouseLeave={this.actionFactory('item-blur-remove', i)}
                className="fa fa-trash-o" 
                aria-hidden="true"></i>
            </span>
          }
          {todo.removeHint &&
            <span className="options">
              <i className="fa fa-trash-o hint" aria-hidden="true"></i>
            </span>
          }
        </li>;
      }
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

TodoComponent.propTypes = {
  action: React.PropTypes.func,
  todos: React.PropTypes.array
};
