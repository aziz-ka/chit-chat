import React from 'react';
import _map from 'lodash/map';
import classnames from 'classnames';


export default class Users extends React.Component {
  handleUserSelection = id => {
    if (!this.props.user.id) return;

    const newChat = {
      created_at: new Date(),
      users: [this.props.user.id, id]
    };

    this.props.createNewChat.call(this, newChat, this.props.user.id);
  }

  renderUser = ({ avatar, name }, id) => {
    if (id === this.props.user.id) return;

    return (
      <button
        className='user list-group-item list-group-item-action rounded-0'
        key={id}
        onClick={this.handleUserSelection.bind(this, id)}
      >
        <img alt='User avatar' className='user__avatar rounded-circle' src={avatar} />
        &nbsp;&nbsp;&nbsp;
        <span className='user__name'>{ name }</span>
      </button>
    );
  }

  render = () => (
    <div className={classnames('users col-4 p-0', { 'users--blured': !this.props.user.id })}>
      <ul className='list-group bg-light pr-0'>
        <li className='user__pick-new-msg list-group-item list-group-item-action rounded-0'>
          Start a new chat
        </li>
        { _map(this.props.users, this.renderUser) }
      </ul>
    </div>
  )
}
