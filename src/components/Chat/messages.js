import React from 'react';
import classnames from 'classnames';
import _map from 'lodash/map';


export default class Messages extends React.Component {
  renderMessage = ({ body, user_id, created_at }, id) => {
    const isUsersMsg = user_id === this.props.match.params.user_id;
    const dateSent = new Date(created_at);
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

  render = () => (
    <div className='messages py-3'>
      { _map(this.props.messages, this.renderMessage) }
    </div>
  )
}
