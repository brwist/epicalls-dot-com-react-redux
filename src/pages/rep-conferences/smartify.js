import { compose } from 'redux'
import { withState, lifecycle } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import api from 'api'

const selector = createStructuredSelector({
  conferences: state => state.repConferences.results,
})

const mapDispatchToProps = dispatch => ({
  load: () => dispatch(api.actions.repConferences.get()),
})

export default compose(
  withState('conferenceInfo', 'setConferenceInfo', null),
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
