import connectForm from 'utils/connect-form'
import { compose } from 'redux'
import { actions } from 'react-redux-form'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

const source = state => {
  const res = []
  // TODO: move this logic to the server side
  // state.currentUser.contacts
  //   .forEach(contact => res.find(r => r.value === contact.number) || res.push({
  //     text: `${contact.name} (${contact.number})`,
  //     value: contact.number,
  //   }));
  // state.repCalls.results
  //   .forEach(call => res.find(r => r.value === call.number) || res.push({
  //     text: call.number,
  //     value: call.number,
  //   }));
  return res
}
const queRe = state => {
  const q = state.upcomingCall.name.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
  return new RegExp(q, 'gi')
}
const dataSource = createSelector(source, queRe, (source, queRe) =>
  source.filter(s => queRe.test(s.number) || queRe.test(s.text)),
)

const selector = createStructuredSelector({
  dataSource,
})

const mapDispatchToProps = (dispatch, props) => ({
  setName: value => {
    dispatch(actions.change('upcomingCall.name', value))
    dispatch(actions.change('upcomingCall.number', value))
  },
  setNumber: ({ text, value }) =>
    dispatch(actions.change('upcomingCall.number', value)),
  setScheduledAt: (event, value) =>
    dispatch(actions.change('upcomingCall.scheduledAt', value.toJSON())),
  setScheduledAtTime: (event, value) =>
    dispatch(actions.change('upcomingCall.scheduledAtTime', value.toJSON())),
})

export default compose(
  connect(
    selector,
    mapDispatchToProps,
  ),
  connectForm({
    form: 'upcomingCall',
    action: 'createUpcomingCall',
    after: (dispatch, props) => {
      dispatch(actions.reset('upcomingCall'))
      props.onRequestClose()
    },
  }),
)
