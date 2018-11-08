import React from 'react';
import io from 'socket.io-client';
import _get from 'lodash/get';

import { getMinuteDiff } from 'utils';
import { AppContext } from '../App';
import Chats from './chats';
import Messages from './messages';
import NewMessage from './new_message';
import './index.css';


const socket = io(process.env.REACT_APP_API_URL);

class Chat extends React.PureComponent {
  componentDidMount = () => {
    const { chat_id, user_id } = this.props.match.params;

    socket.emit('chat', chat_id);
    socket.on('typing', ({ isTyping }) => this.props.setMessageStatus({ isTyping }));

    this.props.listenToChats.call(this, user_id);
    this.props.listenToMessages.call(this, chat_id);
  }

  componentDidUpdate = prevProps => {
    const { chat_id } = this.props.match.params;

    if (prevProps.match.params.chat_id !== chat_id) {
      this.props.listenToMessages.call(this, chat_id);

      socket.emit('chat', chat_id);
    }
  }

  getChatParticipant(chatId=this.props.match.params.chat_id) {
    const { chats, match, users } = this.props;
    const allChatParticipantIds = Object.keys(_get(chats[chatId], 'user_ids', {}));
    const chatParticipantId = allChatParticipantIds.filter(id => id !== match.params.user_id);
    const chatParticipant = users[chatParticipantId[0]];

    return { ...chatParticipant, id: chatParticipantId[0] };
  }

  renderContactStatus = ({ created_at }) => (
    this.props.isTyping
      ? 'typing...'
      : getMinuteDiff(created_at)
        ? `joined ${getMinuteDiff(created_at)} minutes ago`
        : 'just joined'
  )

  renderActiveContact = () => (
    <div className='active-contact fixed-top'>
      <div className='col offset-md-3 offset-xl-2 bg-light p-3'>
        <img
          alt='Chat participant avatar'
          className='contact__avatar rounded-circle float-left mr-3'
          src={this.getChatParticipant().avatar} />
        <p className='contact__name m-0'>{ this.getChatParticipant().name }</p>
        <p className='contact__typing m-0 font-italic text-muted'>
          { this.renderContactStatus(this.getChatParticipant()) }
        </p>
      </div>
    </div>
  )

  render = () => (
    <div>
      { this.props.match.params.user_id && this.props.match.params.chat_id && this.renderActiveContact() }
      <Chats
        match={this.props.match}
        chats={this.props.chats}
        users={this.props.users}
        chatParticipant={this.getChatParticipant} />
      <Messages match={this.props.match} messages={this.props.messages} />
      <NewMessage match={this.props.match} createNewMsg={this.props.createNewMsg} />
    </div>
  )
}


export default props => (
  <AppContext.Consumer>{ context => <Chat {...context} {...props} /> }</AppContext.Consumer>
);
