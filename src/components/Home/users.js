import React from 'react';
import _map from 'lodash/map';
import classnames from 'classnames';

import { getChatId } from '../../utils';


export default class Users extends React.Component {
  handleUserSelection = selectedUserId => {
    const { id } = this.props.user;

    if (!id) return;

    const chat = {
      created_at: new Date(),
      user_ids: {
        [selectedUserId]: true,
        [id]: true
      }
    };
    const chatId = getChatId(selectedUserId, id);
    const payload = { chat, chatId };

    this.props.createNewChat.call(this, payload);
    this.props.history.push({ pathname: `/${id}/chat/${chatId}` });
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
    <div className={classnames('users col-4 p-0', { 'users--blured': !this.props.match.params.user_id })}>
      <ul className='list-group bg-light pr-0'>
        <li className='user__pick-new-msg list-group-item list-group-item-action rounded-0 text-center'>
          Start a new chat
        </li>
        { _map(this.props.users, this.renderUser) }
      </ul>
    </div>
  )
}
