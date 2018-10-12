import React from 'react';
import classnames from 'classnames';
import _map from 'lodash/map';


export default class Messages extends React.Component {
  renderMessage = ({ body, user_id, created_at }, id) => {
    const isUsersMsg = user_id === this.props.match.params.user_id;
    const dateSent = new Date(created_at);
    const timeSent = dateSent.toLocaleTimeString();
    const timeSentFormatted = timeSent.replace(timeSent.substr(-6, 3), '');

    const msgBodyClasses = classnames('message__body px-2 py-1', {
      'bg-primary float-right text-white': isUsersMsg,
      'float-left': !isUsersMsg
    });
    const msgTimeClasses = classnames('message__time pl-3 font-italic font-weight-light float-right mb-2', {
      'message__time--dark': !isUsersMsg
    });
    const msgWrapperClasses = classnames('mb-1', {
      'col offset-md-6': isUsersMsg,
      'col-6 offset-md-3 offset-xl-2': !isUsersMsg
    });

    return (
      <div className='message row' key={id}>
        <p className={msgWrapperClasses}>
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
