import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withState, lifecycle } from 'recompose'
import api from 'api'
import { actions } from 'react-redux-form'

const selector = createStructuredSelector({
  pricings: state => state.pricings.results,
  pricingsRequestStatus: state => state.pricings.status,
})

const mapDispatchToProps = (dispatch, props) => ({
  load: () => dispatch(api.actions.pricings.get()),
  toggleShowOnPricing: id => (e, showOnPricing) => {
    dispatch(api.actions.updatePricing(id, { showOnPricing }))
  },
  update: (pricingId, managerId) => (_e, isInputChecked) => {
    if (isInputChecked) {
      dispatch(api.actions.addPricingToAManager({ pricingId, managerId }))
    } else {
      dispatch(api.actions.removePricingFromAManager({ pricingId, managerId }))
    }
  },
  remove: () => {
    dispatch(api.actions.removePricing(props.currentPricing.id))
    props.setCurrentPricing(null)
  },
  setCurrentPricing: model => () => {
    props.setCurrentPricing(model)
    const {
      name,
      pricePerSit,
      pricePerLocalNumber,
      pricePerThousandMinutes,
    } = model
    dispatch(
      actions.change('pricingEdit', {
        name,
        pricePerSit,
        pricePerLocalNumber,
        pricePerThousandMinutes,
      }),
    )
  },
  clearCurrentPricing: () => {
    props.setCurrentPricing(null)
    dispatch(actions.reset('pricingEdit'))
  },
})

export default compose(
  withState('currentPricing', 'setCurrentPricing', null),
  connect(
    selector,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.load()
    },
  }),
)
