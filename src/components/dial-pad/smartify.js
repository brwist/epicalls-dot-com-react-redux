import { actions } from 'react-redux-form'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const selector = createStructuredSelector({
  callNumber: state => state.call.number,
})

const mapDispatchToProps = (dispatch, props) => ({
  updateNumber: callNumber => {
    dispatch(actions.load('call.number', callNumber))
    dispatch(actions.focus('call.number'))
  },
})

export default connect(
  selector,
  mapDispatchToProps,
)
