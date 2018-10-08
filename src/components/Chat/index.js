import React from 'react';
import _reduce from 'lodash/reduce';

import { getMinuteDiff } from '../../utils';
import { AppContext } from '../App';
import Chats from './chats';
import Messages from './messages';
import NewMessage from './new_message';
import './index.css';


class Chat extends React.Component {
  get chatParticipants() {
    return _reduce(this.props.chats, (acc, { users }) => {
      users.forEach(id => { if (id !== this.props.match.params.user_id) acc[id] = this.props.users[id] });
      return acc;
    }, {});
  }

  get chatParticipant() {
    const chatParticipants = this.chatParticipants;
    const chatParticipant = Object.values(chatParticipants)[0];
    const chatParticipantId = Object.keys(chatParticipants)[0];

    if (!chatParticipant) return {};

    return { ...chatParticipant, id: chatParticipantId };
  }

  componentDidMount = () => {
    const { chat_id, user_id } = this.props.match.params;

    this.props.fetchUsersChats.call(this, user_id);
    this.props.fetchChatMsgs.call(this, chat_id);
    this.props.fetchUsersChat.call(this, user_id, this.chatParticipant.id);
  }

  renderContactStatus = ({ created_at }) => (
    'this.state.contactTyping' === 'this.state.activeContactId'
      ? 'typing...'
      : getMinuteDiff(created_at)
        ? `joined ${getMinuteDiff(created_at)} minutes ago`
        : 'just joined'
  )

  renderActiveContact = () => (
    <div className='active-contact row fixed-top'>
      <div className='col offset-md-3 offset-lg-2 bg-light p-3'>
        <img alt='Chat participant avatar' className='contact__avatar float-left mr-3' src={this.chatParticipant.avatar} />
        <p className='contact__name m-0'>{ this.chatParticipant.name }</p>
        <p className='contact__typing m-0 font-italic text-muted'>
          { this.renderContactStatus(this.chatParticipant) }
        </p>
      </div>
    </div>
  )

  render = () => (
    <div>
      { this.props.match.params.user_id && this.renderActiveContact() }
      <Chats {...this.props} chatParticipant={this.chatParticipant} />
      <Messages {...this.props} />
      <NewMessage {...this.props} />
    </div>
  )
}


export default props => <AppContext.Consumer>{ context => <Chat {...context} {...props} /> }</AppContext.Consumer>;
