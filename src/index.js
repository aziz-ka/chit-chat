import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from 'components/App';
import Chat from 'components/Chat';
import registerServiceWorker from 'utils/registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <main className='container-fluid'>
      <Route path='/' component={App} exact />
      <Route path='/chat' component={Chat} />
    </main>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
