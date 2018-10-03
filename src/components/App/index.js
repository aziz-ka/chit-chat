import React from 'react';

import './index.css';


export default class App extends React.Component {
  state = { name: '' }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;

    const user = {
      avatar: `http://tinygraphs.com/squares/${name}?theme=seascape&numcolors=4&size=50&fmt=svg`,
      name
    };

    this.setState({ name: '' });

    this.props.history.push({
      pathname: '/chat',
      state: { user }
    });
  }

  renderForm = () => (
    <form className='form-row p-2 mt-5' onSubmit={this.handleSubmit}>
      <div className='input-group'>
        <label className='sr-only' htmlFor='name'>Enter your name</label>
        <input
          autoComplete='off'
          className='form-control col p-2'
          id='name'
          name='name'
          onChange={this.handleChange}
          placeholder='Enter your name'
          required
          type='text'
          value={this.state.name} />
        <div className='input-group-append'>
          <button
            className='btn btn-primary border-0 rounded-0'
            disabled={!this.state.name}
            type='submit'
          >
            Ready Player One
          </button>
        </div>
      </div>
    </form>
  )

  render = () => (
    <div>
      <div className='row'>
        <h1 className='col-12'>Hello, Citizen!</h1>
        <h3 className='col-12'>Came to chit-chat with fellow strangers? Well, pick yourself a name and hop in. But be nice ;)</h3>
      </div>
      { this.renderForm() }
    </div>
  )
}
