import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import smoothscroll from 'smoothscroll-polyfill'
import { compose, lifecycle } from 'recompose'
import moment from 'moment'
import './styles.css'

smoothscroll.polyfill()

const smoothScroll = behavior =>
  document.querySelector('#messages-bottom').scrollIntoView({ behavior })

const MessageHistoryItem = ({ id, message, incoming, createdAt }) => (
  <div
    className={cx({
      'message-history-item': true,
      incoming,
    })}
  >
    <div className="history-item-body">{message}</div>
    <div className="history-item-time">
      {moment(new Date(createdAt)).format('HH:mm:ss')}
    </div>
  </div>
)

const MessageHistoryDateItem = ({ date }) => (
  <div className="history-date-item">{date}</div>
)

const MessageHistory = ({ messages }) => {
  const messageDates = []
  const componentsToRender = []
  messages.forEach(message => {
    const momentCreatedAt = moment(new Date(message.createdAt))
    const messageDate = momentCreatedAt.format('DD/MM/YY')
    const isNewDate = messageDates.indexOf(messageDate) === -1
    if (isNewDate) {
      messageDates.push(messageDate)
      componentsToRender.push(
        <MessageHistoryDateItem
          date={messageDate}
          key={`${message.id}-${messageDate}`}
        />,
      )
    }
    componentsToRender.push(
      <MessageHistoryItem key={message.id} {...message} />,
    )
  })
  return (
    <div className="messages-message-history">
      {componentsToRender}
      <div id="messages-bottom" />
    </div>
  )
}

MessageHistoryItem.propTypes = {
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  incoming: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

MessageHistoryDateItem.propTypes = {
  date: PropTypes.string.isRequired,
}

MessageHistory.propTypes = {
  messages: PropTypes.array.isRequired,
}

export default compose(
  lifecycle({
    componentDidMount() {
      smoothScroll('auto')
    },
    componentDidUpdate() {
      smoothScroll('auto')
    },
  }),
)(MessageHistory)
