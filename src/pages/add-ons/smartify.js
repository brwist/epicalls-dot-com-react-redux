import { compose } from 'redux'
import { connect } from 'react-redux'
import api from 'api'
import { createStructuredSelector } from 'reselect'
import withJob from 'utils/with-job'
import { toggleAddOn } from 'actions'
import { withState, withHandlers, lifecycle } from 'recompose'
import connectForm from 'utils/connect-form'

const selector = createStructuredSelector({
  addOns: state => state.addOns,
  planhatApiKey: state => state.currentUser.company.planhatApiKey,
})

const mapDispatchToProps = dispatch => ({
  load: () => {
    dispatch(api.actions.addOns.get())
  },
  toggle: (sid, installed) => () => {
    if (installed) {
      dispatch(api.actions.removeAddOn(sid))
    } else {
      dispatch(api.actions.createAddOn({ addOn: { sid } }))
    }
    dispatch(toggleAddOn({ sid }))
  },
  disablePlanhat: () => {
    dispatch(api.actions.updatePlanhatApiKey({ planhatApiKey: null }))
  },
})

const work = ({ load }) => load()

export default compose(
  connect(
    selector,
    mapDispatchToProps,
  ),
  withState('planhatEnabled', 'setPlanhatStatus', false),
  withState('planhatApiKeyUpdated', 'setPlanhatApiKeyUpdated', false),
  withHandlers({
    togglePlanhat: ({ planhatEnabled, setPlanhatStatus, disablePlanhat }) => () => {
      if (planhatEnabled) {
        disablePlanhat()
        setPlanhatStatus(false)
      }
      if (!planhatEnabled) {
        setPlanhatStatus(true)
      }
    },
    togglePlanhatApiKeyUpdated: ({ setPlanhatApiKeyUpdated }) => () =>
      setPlanhatApiKeyUpdated(current => !current),
  }),
  connectForm({
    form: 'planhat',
    action: 'updatePlanhatApiKey',
  }),
  lifecycle({
    componentWillUpdate(nextProps) {
      if (nextProps.planhatApiKey !== this.props.planhatApiKey) {
        this.props.setPlanhatApiKeyUpdated(true)
      }
    },
    componentDidMount() {
      if (this.props.planhatApiKey) {
        this.props.setPlanhatStatus(true)
      }
    }
  }),
  withJob({ work }),
)
