import connectForm from 'utils/connect-form'
import { compose } from 'redux'
import { withState, lifecycle, withHandlers } from 'recompose'
import { actions } from 'react-redux-form'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import withJob from 'utils/with-job'
import api from 'api'
import standardErrorHandling from 'utils/standard-error-handling'

const selector = createStructuredSelector({
  webhookActions: state => state.webhookActions.results,
})

const mapDispatchToProps = (dispatch, props) => ({
  loadWebhookActions: () => dispatch(api.actions.webhookActions.get()),
  removeWebhook: () =>
    dispatch(api.actions.removeWebhook(props.webhookToRemove.id)).then(_ =>
      props.setWebhookToRemove(null),
    ),
  testWebhook: data => {
    dispatch(actions.reset('testWebhook.commonErrors'))
    const request = dispatch(
      api.actions.testWebhook(props.webhookToTest.id, data),
    )
      // .then(res => console.log(res))
      .catch(standardErrorHandling)
    dispatch(actions.submit('testWebhook', request, { fields: true }))
  },
  closeTestWebhook: e => {
    props.setWebhookToTest(null)
    dispatch(actions.reset('testWebhook'))
  },
})

const work = ({ loadWebhookActions }) => loadWebhookActions()

export default compose(
  withState('webhookToRemove', 'setWebhookToRemove', null),
  withState('webhookToTest', 'setWebhookToTest', null),
  withState('openAddNewModal', 'setAddNewModal', false),
  withHandlers({
    closeWebhook: ({ setWebhookToRemove }) => e => setWebhookToRemove(null),
  }),
  connectForm({
    form: 'webhook',
    action: 'createWebhook',
    after: (dispatch, props) => {
      props.setAddNewModal(false)
      dispatch(actions.reset('webhook'))
    },
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
  withJob({ work }),
  lifecycle({
    componentDidMount() {
      this.props.reset('webhook')
    },
  }),
)
