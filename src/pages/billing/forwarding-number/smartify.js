import { compose } from 'redux'
import { withState } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import standardErrorHandling from 'utils/standard-error-handling'
import api from 'api'

const mapDispatchToProps = (dispatch, props) => ({
  makeValidationCall: () => {
    dispatch(api.actions.makeValidationCall())
      .then(_ => props.setValidationCallModal(true))
      .catch(({ error }) => props.setValidationError(error))
  },
  checkValidationCode: model => {
    const request = dispatch(api.actions.checkConfirmationCode(model))
      .then(_ => {
        props.setValidationCallModal(false)
        dispatch(actions.reset('validationCode'))
      })
      .catch(standardErrorHandling)
    dispatch(actions.submit('validationCode', request, { fields: true }))
  },
  createCallApiNumber: () => {
    dispatch(api.actions.createCallApiNumber()).catch(({ error }) =>
      props.setValidationError(error),
    )
  },
  callApi: () => {
    dispatch(api.actions.callApi()).catch(({ error }) =>
      props.setValidationError(error),
    )
  },
})

export default compose(
  withState('validationCallModalOpen', 'setValidationCallModal', false),
  withState('validationError', 'setValidationError', null),
  connect(
    null,
    mapDispatchToProps,
  ),
)
