import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Chat from 'components/Chat';
import Home from 'components/Home';
import { DB } from '../../utils';


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
    fetchChatMsgs: fetchChatMsgs,
    fetchUsersChat: fetchUsersChat,
    fetchUsersChats: fetchUsersChats,
    setChats: chats => this.setState({ chats }),
    setMessages: messages => this.setState({ messages }),
    setUser: user => this.setState({ user })
  }

  componentDidMount = fetchAllUsers.bind(this)

  render = () => (
    <BrowserRouter>
      <AppContext.Provider value={this.state}>
        <main className='container-fluid'>
          <Route path='/' component={Home} exact />
          <Route path='/:user_id?/chat/:chat_id?' component={Chat} />
        </main>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

function createNewUser(newUser) {
  if (!newUser) return;

  DB.collection('users')
    .add(newUser)
    .then(doc => {
      this.setState({ name: '' });
      this.props.setUser({ ...newUser, id: doc.id });
    })
    .catch(console.error);
}

function createNewChat(newChat, userId) {
  if (!newChat || !userId) return;

  DB.collection('chats')
    .add(newChat)
    .then(doc => this.props.history.push({ pathname: `/${userId}/chat/${doc.id}` }))
    .catch(console.error);
}

function createNewMsg(msg) {
  if (!msg) return;

  DB.collection('messages')
    .add(msg)
    .catch(console.error);
}

function fetchAllUsers() {
  DB.collection('users')
    .get()
    .then(docs => {
      const users = {};
      docs.forEach(doc => users[doc.id] = doc.data());
      this.setState({ users });
    })
    .catch(console.error);
}

function fetchChatMsgs(chatId) {
  if (!chatId) return;

  DB.collection('messages')
    .where('chat_id', '==', chatId)
    .get()
    .then(docs => {
      const messages = {};
      docs.forEach(doc => messages[doc.id] = doc.data());
      this.props.setMessages(messages);
    })
    .catch(console.error);
}

function fetchUsersChat(userId, anotherUserId) {
  if (!userId || !anotherUserId) return;

  DB.collection('chats')
    .where('user_ids', 'array-contains', userId)
    .where('user_ids', 'array-contains', anotherUserId)
    .get()
    .catch(console.error);
}

function fetchUsersChats(id) {
  if (!id) return;

  DB.collection('chats')
    .where('users', 'array-contains', id)
    .get()
    .then(docs => {
      const chats = {};
      docs.forEach(doc => chats[doc.id] = doc.data());
      this.props.setChats(chats);
    })
    .catch(console.error);
}
