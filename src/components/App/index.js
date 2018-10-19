import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Chat from 'components/Chat';
import Home from 'components/Home';
import {
  createNewChat, createNewMsg, createNewUser,
  listenToChats, listenToMessages, listenToUsers
} from 'actions';


export const AppContext = React.createContext();

export default class App extends React.Component {
  state = {
    chats: {},
    messages: {},
    user: {},
    users: {},
    createNewChat: createNewChat,
    createNewUser: createNewUser,
    createNewMsg: createNewMsg,
    listenToChats: listenToChats,
    listenToMessages: listenToMessages,
    setChats: chats => this.setState({ chats }),
    setMessages: messages => this.setState({ messages }),
    setMessageStatus: status => this.setState(status),
    setUser: user => this.setState({ user })
  }

  componentDidMount = () => listenToUsers.call(this)

  render = () => (
    <AppContext.Provider value={this.state}>
      <BrowserRouter>
        <main className='container-fluid'>
          <Route path='/:user_id?' component={Home} exact />
          <Route path='/:user_id?/chat/:chat_id?' component={Chat} />
        </main>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
