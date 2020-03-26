import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { actions } from 'react-redux-form'
import api from 'api'
import { compose } from 'redux'
import { lifecycle } from 'recompose'

const selector = createStructuredSelector({
  company: state => state.company.results,
})

const mapDispatchToProps = (dispatch, props) => ({
	load: () => {
	    dispatch(api.actions.company.get())
	},
	notFound: () => {
		props.history.push("/404")
	}
})

export default compose(
  connect(
  	selector,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.load()
    },
  }),
)