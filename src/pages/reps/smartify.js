import { createSelector, createStructuredSelector } from 'reselect'
import { actions } from 'react-redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withState, withHandlers } from 'recompose'
import { searchQuery } from 'selectors'
import api from 'api'
import standardErrorHandling from 'utils/standard-error-handling'

const query = searchQuery('searchReps')
const salesReps = state => state.currentUser.salesReps

const filteredSalesReps = createSelector(query, salesReps, (query, salesReps) =>
  salesReps.filter(c => {
    if (query !== '') {
      const re = new RegExp(query, 'i')
      return re.test(c.number) || re.test(c.name) || re.test(c.email)
    }
    return true
  }),
)

const selector = createStructuredSelector({ reps: filteredSalesReps })

const mapDispatchToProps = (dispatch, props) => ({
  removeSalesRep: () => {
    dispatch(api.actions.removeRep(props.removeSalesRepModalOpen.id)).then(
      props.toggleRemoveSalesRepModal,
    )
    .then(_ => dispatch(api.actions.reps.get()))
    .catch(standardErrorHandling)
  },
  loginAsRep: id => dispatch(api.actions.repToken(id)),
  toggleRep: rep =>
    dispatch(api.actions.updateRep(rep.id, { rep: { active: !rep.active } })),
  removeRepLocalNumbers: rep => () => {
    dispatch(api.actions.removeRepLocalNumbers(rep.id))
    props.setToggledRep(null)
  },
  setRepToEditForm: rep => {
    let { id, name, number, email } = rep
    email = email || ''
    name = name || ''
    dispatch(actions.change('rep', { id, name, number, email }))
    props.setRepToEdit(rep)
  },
  resetRepForm: e => dispatch(actions.reset('rep')),
  saveRep: model => {
    const request = dispatch(api.actions.updateRep(model.id, {
        rep: {first_name: model.name, email: model.email, forwarding_number_attributes: {number: model.number}}
      }))
      .then(_ => dispatch(actions.reset('rep')))
      .then(_ => props.setRepToEdit(null))
      .then(_ => dispatch(api.actions.reps.get()))
      .catch(standardErrorHandling)
    dispatch(actions.submit('rep', request, { fields: true }))
  },
})

export default compose(
  withState('removeSalesRepModalOpen', 'openRemoveSalesRepModal', false),
  withState('salesRepToRemove', 'setSalesRepToRemove', {}),
  withState('repToEdit', 'setRepToEdit', null),
  withState('toggledRep', 'setToggledRep', null),
  withHandlers({
    toggleRemoveSalesRepModal: ({ openRemoveSalesRepModal }) => e =>
      openRemoveSalesRepModal(current => !current),
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
)
