import React from 'react';
import _map from 'lodash/map';
import { Link } from 'react-router-dom';


const renderChat = (props, chat, id) => (
  <Link
    className='chat list-group-item list-group-item-action rounded-0'
    key={id}
    to={`/${props.match.params.user_id}/chat/${id}`}
  >
    <img alt='Chat participants avatar' className='contact__avatar rounded-circle' src={props.chatParticipant.avatar} />
    &nbsp;&nbsp;&nbsp;
    <span className='contact__name'>{ props.chatParticipant.name }</span>
  </Link>
)

export default props => (
  <div className='chats row'>
    <ul className='list-group col-md-3 col-lg-2 bg-light pr-0'>
      <li className='user__pick-new-msg list-group-item list-group-item-action rounded-0'>
        Your chats
      </li>
      { _map(props.chats, renderChat.bind(null, props)) }
    </ul>
  </div>
)
