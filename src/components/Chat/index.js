import React from 'react';
import classnames from 'classnames';

import { getMinuteDiff } from '../../utils';
import './index.css';


export default class Chat extends React.Component {
  state = {
    new_message: '',
    messages: [],
    users: []
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault();

    const new_message = {
      body: this.state.new_message,
      id: `message_${getUniqueID()}`,
      sender: this.props.location.state.user,
      timestamp: Date.now(),
      status: {
        isSent: true,
        isReceived: false
      }
    };

    console.log('message', new_message);

    this.setState({ new_message: '' });
  }

  renderNoContactsMsg = () => (
    <p className='contact__name m-0'>Chit-Chatroom is empty. Hang in there. Someone will join... soon</p>
  )

  renderContactInfo = () => {
    const { users } = this.state;
    const { avatar, id, name } = lastUserToJoin;

    return [
      <img className='contact__avatar float-left mr-3' key='avatar' src={avatar} />,
      <p className='contact__name m-0' key='name'>{ name }</p>
    ];
  }

  renderContact = () => (
    <div className='contact row'>
      <div className='col bg-light p-3'>
        {
          this.state.users.length > 1
            ? this.renderContactInfo()
            : this.renderNoContactsMsg()
        }
      </div>
    </div>
  )

  renderMessage = ({ body, id, sender, timestamp }) => {
    const isUsersMsg = sender.id === this.props.location.state.user.id;
    const dateSent = new Date(timestamp);
    const timeSent = dateSent.toLocaleTimeString();
    const timeSentFormatted = timeSent.replace(timeSent.substr(-6, 3), '');

    const msgBodyClasses = classnames('message__body p-2', {
      'bg-primary float-right text-right text-white': isUsersMsg
    });
    const msgTimeClasses = classnames('message__time pl-3 font-italic font-weight-light', {
      'message__time--dark': !isUsersMsg
    });

    return (
      <div className='message row' key={id}>
        <p className='col'>
          <span className={msgBodyClasses}>
            { body }
            <span className={msgTimeClasses}>{ timeSentFormatted }</span>
          </span>
        </p>
      </div>
    );
  }

  renderMessages = () => (
    <div className='messages py-3'>
      { this.state.messages.map(this.renderMessage) }
    </div>
  )

  renderForm = () => (
    <form className='form-row fixed-bottom border-top p-2' onSubmit={this.handleSubmit}>
      <div className='input-group'>
        <label className='sr-only' htmlFor='new_message'>Type a message...</label>
        <input
          autoComplete='off'
          className='form-control border-0 col p-2'
          disabled={this.state.users.length <= 1}
          id='new_message'
          name='new_message'
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          placeholder='Type a message...'
          type='text'
          value={this.state.new_message} />
        <div className='input-group-append'>
          <button
            className='btn btn-outline-secondary border-0 rounded-0'
            disabled={!this.state.new_message}
            type='submit'
          >
            Send
          </button>
        </div>
      </div>
    </form>
  )

  render = () => (
    <div>
      { this.renderContact() }
      { this.renderMessages() }
      { this.renderForm() }
    </div>
  )
}
