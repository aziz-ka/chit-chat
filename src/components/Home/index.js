import React from 'react';

import { AppContext } from '../App';
import Users from './users';
import './index.css';


class Home extends React.Component {
  state = { name: '' }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;
    const newUser = {
      name,
      avatar: `http://tinygraphs.com/squares/${name}?theme=seascape&numcolors=4&size=50&fmt=svg`,
      created_at: new Date()
    };

    this.props.createNewUser.call(this, newUser);
  }

  renderForm = () => (
    <form className='form-row p-2 mt-5' onSubmit={this.handleSubmit}>
      <div className='input-group'>
        <label className='sr-only' htmlFor='name'>Enter your name</label>
        <input
          autoComplete='off'
          className='form-control col p-2'
          disabled={this.props.user.id}
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
    <div className='row'>
      <Users {...this.props} />
      <div className='new-user col-8'>
        <h1>Hello, Citizen!</h1>
        <h3>Came to chit-chat with fellow strangers? Well, pick yourself a name and hop in. But be nice ;)</h3>
        { this.renderForm() }
      </div>
    </div>
  )
}


export default props => <AppContext.Consumer>{ context => <Home {...context} {...props} /> }</AppContext.Consumer>;
