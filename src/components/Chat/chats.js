import React from 'react';
import _map from 'lodash/map';
import { Link } from 'react-router-dom';


export default class Chats extends React.PureComponent {
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
        <li className='chats__go-to-chat list-group-item list-group-item-action col-md-3 col-xl-2 position-fixed rounded-0 text-center'>
          {
            Object.keys(this.props.users).length
              ? 'Active chats'
              : <span>No chats yet<br /><Link to={this.props.match.params.user_id}>start a new chat</Link></span>
          }
        </li>
        { _map(this.props.chats, this.renderChat) }
      </ul>
    </div>
  )
}
