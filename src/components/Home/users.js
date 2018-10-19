import React from 'react';
import _map from 'lodash/map';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { getChatId } from 'utils';


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
  }

  renderUser = ({ avatar, name }, id) => {
    const { user_id } = this.props.match.params;

    if (id === user_id) return;

    return (
      <Link
        className='user list-group-item list-group-item-action rounded-0'
        key={id}
        onClick={this.handleUserSelection.bind(this, id)}
        to={`/${user_id}/chat/${getChatId(id, user_id)}`}
      >
        <img alt='User avatar' className='user__avatar rounded-circle' src={avatar} />
        &nbsp;&nbsp;&nbsp;
        <span className='user__name'>{ name }</span>
      </Link>
    );
  }

  renderUserListHeader = () => {
    if (!Object.keys(this.props.users).length) return "No one's here yet";

    const { user_id } = this.props.match.params;

    if (user_id) return (
      <span>
        Start a new chat
        <br />
        { user_id && <Link to={`/${user_id}/chat/`}>or go to your chats</Link> }
      </span>
    );

    return 'Start a new chat';
  }

  render = () => (
    <div className={classnames('users col-4 p-0', { 'users--blured': !this.props.match.params.user_id })}>
      <ul className='list-group bg-light pr-0'>
        <li className='users__start-new-chat list-group-item list-group-item-action rounded-0 text-center'>
          { this.renderUserListHeader() }
        </li>
        { _map(this.props.users, this.renderUser) }
      </ul>
    </div>
  )
}
