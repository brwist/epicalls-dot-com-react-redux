import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import api from 'api'

const selector = createStructuredSelector({
  plans: state => state.publishedPricings.results,
})

const mapDispatchToProps = (dispatch, props) => ({
  load: () => dispatch(api.actions.publishedPricings.get()),
  choosePricing: id => () => dispatch(api.actions.choosePricing({ id })),
})

export default compose(
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
