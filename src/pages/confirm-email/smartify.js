import { connect } from 'react-redux'
import { compose } from 'redux'
import lifecycle from 'recompose/lifecycle'
import api from 'api'
import { createStructuredSelector } from 'reselect'

const selector = createStructuredSelector({
  id: (_, { match }) => match.params.id,
  email: (_, { match }) => match.params.email,
})

const mapDispatchToProps = (dispatch, props) => ({
  confirm: (id, email) =>
    dispatch(api.actions.confirmEmail(id, { email })).then(_ =>
      props.history.push('/my-account'),
    ),
})

export default compose(
  connect(
    selector,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { confirm, id, email } = this.props
      confirm(id, email)
    },
  }),
)
