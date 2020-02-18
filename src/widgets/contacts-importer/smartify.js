import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { createStructuredSelector } from 'reselect'
import api from 'api'

const selector = createStructuredSelector({
  contacts: store => store.importContacts.contacts,
})

const mapDispatchToProps = (dispatch, props) => ({
  submit: model => {
    const contacts = []
    for (const contact in model.contacts) {
      if (
        model.contacts.hasOwnProperty(contact) &&
        model.contacts[contact].checked
      ) {
        contacts.push(model.contacts[contact])
      }
    }
    dispatch(api.actions.importContacts({ contacts })).then(_ =>
      dispatch(actions.reset('importContacts')),
    )
  },
  toggle: (e, isInputChecked) => {
    const phone = e.currentTarget.id.split('-')[0]
    dispatch(
      actions.change(
        `importContacts.contacts[${phone}].checked`,
        isInputChecked,
      ),
    )
  },
  rename: (e, newVal) => {
    const phone = e.currentTarget.id.split('-')[0]
    dispatch(actions.change(`importContacts.contacts[${phone}].name`, newVal))
  },
  changePhone: (e, newVal) => {
    const phone = e.currentTarget.id.split('-')[0]
    dispatch(actions.change(`importContacts.contacts[${phone}].number`, newVal))
  },
})

export default connect(
  selector,
  mapDispatchToProps,
)
