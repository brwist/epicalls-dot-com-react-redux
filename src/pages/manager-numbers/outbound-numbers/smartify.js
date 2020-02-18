import { compose } from 'redux'
import { withState } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import standardErrorHandling from 'utils/standard-error-handling'
import api from 'api'

const mapDispatchToProps = (dispatch, props) => ({
  submit: rep => model => {
    const request = dispatch(api.actions.updateRep(rep.id, model))
      .then(data => {
        props.setRep(null)
        dispatch(actions.reset('rep'))
      })
      .catch(standardErrorHandling)
    dispatch(actions.submit('rep', request, { fields: true }))
  },
})

export default compose(
  withState('selectedRep', 'setRep', null),
  connect(
    null,
    mapDispatchToProps,
  ),
)
