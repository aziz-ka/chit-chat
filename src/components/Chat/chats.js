import React from 'react';
import _map from 'lodash/map';
import { Link } from 'react-router-dom';


export default class Chats extends React.Component {
  renderChat = (chat, id) => (
    <Link
      className='chat list-group-item list-group-item-action rounded-0'
      key={id}
      to={`/${this.props.match.params.user_id}/chat/${id}`}
    >
      <img
        alt='Chat participants avatar'
        className='contact__avatar rounded-circle'
        src={this.props.chatParticipant.call(this, id).avatar} />
      &nbsp;&nbsp;&nbsp;
      <span className='contact__name'>{ this.props.chatParticipant.call(this, id).name }</span>
    </Link>
  )

  render = () => (
    <div className='chats row'>
      <ul className='list-group position-fixed bg-light col-md-3 col-xl-2 p-0'>
        <li className='user__pick-new-msg list-group-item list-group-item-action rounded-0 text-center'>
          Your chats
        </li>
        { _map(this.props.chats, this.renderChat) }
      </ul>
    </div>
  )
}
