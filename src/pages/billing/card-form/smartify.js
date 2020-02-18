import { compose } from 'redux'
import { connect } from 'react-redux'
import api from 'api'
import { injectStripe } from 'react-stripe-elements'

const withStripe = () => component => injectStripe(component)

const mapDispatchToProps = (dispatch, props) => ({
  submitCardDetails: owner => e => {
    e.preventDefault()
    props.stripe
      .createSource({ type: 'card', currency: 'cad', owner })
      .then(({ source, error }) => {
        // eslint-disable-next-line
      if (error) console.error(error);
        dispatch(api.actions.stripeAttachSource({ source }))
      })
    e.currentTarget.reset()
  },
})

export default compose(
  withStripe(),
  connect(
    null,
    mapDispatchToProps,
  ),
)
