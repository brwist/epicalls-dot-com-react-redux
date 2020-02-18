import { createSelector, createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withState, withHandlers } from 'recompose'
import { searchQuery } from 'selectors'
import api from 'api'

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
    dispatch(api.actions.removeRep(props.salesRepToRemove.id)).then(
      props.toggleRemoveSalesRepModal,
    )
  },
  loginAsRep: id => dispatch(api.actions.repToken(id)),
  toggleRep: rep =>
    dispatch(api.actions.updateRep(rep.id, { rep: { active: !rep.active } })),
  removeRepLocalNumbers: rep => () => {
    dispatch(api.actions.removeRepLocalNumbers(rep.id))
    props.setToggledRep(null)
  },
})

export default compose(
  withState('removeSalesRepModalOpen', 'openRemoveSalesRepModal', false),
  withState('salesRepToRemove', 'setSalesRepToRemove', {}),
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
