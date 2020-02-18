import { compose } from 'redux'
import { actions } from 'react-redux-form'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import api from 'api'
import { withState, withHandlers, lifecycle } from 'recompose'

const clientNumberError = createSelector(
  state => state.forms.call.$form.validity.error,
  state => state.forms.call.$form.submitFailed,
  state => state.forms.call.number.errors,
  state => state.callTo && state.callTo.error,
  (serverError, submitFailed, { correctNumber, hasCountryCode }, error) => {
    if (serverError) return serverError
    if (submitFailed && correctNumber) return 'Number must contains only digits'
    if (submitFailed && hasCountryCode) return 'Please select country code'
    if (error) return error
  },
)

const selector = createStructuredSelector({
  clientNumberError,
  clientNumber: state => state.call.number,
  twilioProcessLog: state => state.twilioProcessLog,
  callTo: state => state.callTo,
  callApiNumber: state => state.currentUser.callApiNumber,
  twilioCountries: state => state.twilioCountries.results,
  twilioCountryCodes: state =>
    state.twilioCountries.results.map(c => c.countryCode),
})

const mapDispatchToProps = (dispatch, props) => ({
  submit: async model => {
    dispatch(actions.reset('call.commonErrors'))
    dispatch(actions.reset('contact.commonErrors'))
    const { name, number } = model
    try {
      if (model.name.length > 0) {
        await dispatch(api.actions.addContact({ contact: { number, name } }))
        await dispatch(api.actions.currentUser.get())
      }
      await dispatch(api.actions.callTo.get(number))
    } catch (err) {
      dispatch(actions.setErrors('contact.commonErrors', err.error))
    }
  },
  purchaseNumber: () => {
    dispatch(
      api.actions.addLocalNumber({ localNumber: props.purchaseInfo }),
    ).then(() => {
      props.togglePurchaseModal()
      // Trying to call
      dispatch(actions.submit('call'))
    })
  },
  setCountryCode: (clientNumber, countryCodes) => countryCode => {
    const countryCodesString = countryCodes.join('|')
    const cn = clientNumber.replace(/^\+/, '')
    if (cn.length === 0) {
      return dispatch(actions.change('call.number', `+${countryCode}`))
    }
    const newCnReg = new RegExp(`^(${countryCodesString})`)
    let newCn = cn.replace(newCnReg, countryCode)
    if (newCn !== cn) {
      return dispatch(actions.change('call.number', `+${newCn}`))
    }
    newCn = cn.substr(`${countryCode}`.length)
    dispatch(actions.change('call.number', `+${countryCode}${newCn}`))
  },
  setCountryCodeFromNumber: countryCodes => e => {
    const re = new RegExp(`^\\+(${countryCodes.join('|')})`)
    const match = re.exec(e.target.value)
    if (match) dispatch(actions.change('call.countryCode', +match[1]))
  },
  resetCallForm: () => dispatch(actions.reset('call')),
  changeCallForm: model => dispatch(actions.change('call', model)),
  loadTwilioCountries: () => dispatch(api.actions.twilioCountries.get()),
})

export default compose(
  withState('callModalOpen', 'openCallModal', false),
  withState('purchaseModalOpen', 'openPurchaseModal', false),
  withState('callInfo', 'setCallInfo', {}),
  withState('purchaseInfo', 'setPurchaseInfo', {}),
  withState('myNewContact', 'setMyNewContact', null),
  withState('dialPadOpen', 'setDialPad', false),
  withHandlers({
    toggleCallModal: ({ openCallModal }) => () =>
      openCallModal(current => !current),
    togglePurchaseModal: ({ openPurchaseModal }) => () =>
      openPurchaseModal(current => !current),
    closeDialPad: ({ setDialPad }) => () => setDialPad(false),
    openDialPad: ({ setDialPad }) => () => setDialPad(true),
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadTwilioCountries()
    },
  }),
)
