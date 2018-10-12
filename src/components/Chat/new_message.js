import React from 'react';
// import io from 'socket.io-client';

// import { debounce } from '../../utils';


// const socket = io(process.env.REACT_APP_API_URL);

export default class NewMessage extends React.Component {
  state = { new_message: '' }

  // handleBlur = e => debounce(() => socket.emit('typing', null), 500)()

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault();

    const { chat_id, user_id } = this.props.match.params;

    const newMessage = {
      chat_id,
      user_id,
      body: this.state.new_message,
      created_at: new Date()
    };

    this.props.createNewMsg(newMessage);

    this.setState({ new_message: '' });
  }

  render = () => (
    <form className='form-row fixed-bottom border-top p-2' onSubmit={this.handleSubmit}>
      <div className='input-group'>
        <label className='sr-only' htmlFor='new_message'>Type a message...</label>
        <input
          autoComplete='off'
          className='form-control border-0 col p-2'
          disabled={!this.props.match.params.chat_id}
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
}
