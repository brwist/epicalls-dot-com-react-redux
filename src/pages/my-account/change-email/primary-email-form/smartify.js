import { connect } from 'react-redux'
import api from 'api'
import { createStructuredSelector } from 'reselect'
import { actions } from 'react-redux-form'

const selector = createStructuredSelector({
  form: state => state.forms.changeUserEmail.$form,
})

const mapDispatchToProps = (dispatch, props) => ({
  submit: model => {
    const request = dispatch(api.actions.changeEmail(model.id))
    dispatch(actions.submit('changeUserEmail', request, { fields: true }))
  },
})

export default connect(
  selector,
  mapDispatchToProps,
)
