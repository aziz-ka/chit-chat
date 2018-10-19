import { DB } from 'utils';


export function createNewChat({ chat, chatId }) {
  DB.collection('chats')
    .doc(chatId)
    .set(chat, { merge: true })
    .catch(console.error);
}

export function createNewMsg(msg) {
  DB.collection('messages')
    .add(msg)
    .catch(console.error);
}

export function createNewUser(user) {
  DB.collection('users')
    .add(user)
    .then(doc => {
      this.props.setUser({ ...user, id: doc.id });
      this.props.history.push({ pathname: `/${doc.id}` });
    })
    .catch(console.error);
}

export function listenToChats(id) {
  const userIdPath = `user_ids.${id}`;

  DB.collection('chats')
    .where(userIdPath, '==', true)
    .onSnapshot(docs => {
      const chats = {};
      docs.forEach(doc => chats[doc.id] = doc.data());
      this.props.setChats(chats);
    });
}

export function listenToMessages(chatId='') {
  DB.collection('messages')
    .where('chat_id', '==', chatId)
    .orderBy('created_at')
    .onSnapshot(docs => {
      const messages = {};
      docs.forEach(doc => messages[doc.id] = doc.data());
      this.props.setMessages(messages);
    });
}

export function listenToUsers() {
  DB.collection('users')
    .orderBy('created_at')
    .onSnapshot(docs => {
      const users = {};
      docs.forEach(doc => users[doc.id] = doc.data());
      this.setState({ users} );
    });
}
