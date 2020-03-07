import { createSelector, createStructuredSelector } from 'reselect'
import { actions } from 'react-redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withState, withHandlers, lifecycle } from 'recompose'
import { searchQuery } from 'selectors'
import api from 'api'

const query = searchQuery('searchManagers')
const managers = state => state.currentUser.managers

const filteredManagers = createSelector(query, managers, (query, managers) =>
  managers.filter(c => {
    if (query !== '') {
      const re = new RegExp(query, 'i')
      return re.test(c.name) || re.test(c.email) || re.test(c.company.name)
    }
    return true
  }),
)

const selector = createStructuredSelector({
  managers: filteredManagers,
  pricings: state => state.pricings.results,
})

const mapDispatchToProps = (dispatch, props) => ({
  loadPricings: () => dispatch(api.actions.pricings.get()),
  removeManager: () => {
    dispatch(api.actions.removeManager(props.removeManagerModalOpen.id)).then(
      props.toggleRemoveManagerModal,
      props.setManagerToRemove({})
    )
  },
  loginAsManager: id => dispatch(api.actions.managerToken(id)),
  toggleManager: manager => e => {
    e.stopPropagation()
    dispatch(
      api.actions.updateManager(manager.id, {
        manager: { active: !manager.active },
      }),
    )
  },
  createSubscription: managerId => _e => {
    dispatch(api.actions.stripePlans.get()).then(plans => {
      dispatch(
        api.actions.createStripeSubscription({
          managerId,
          planIds: plans.map(p => p.id),
        }),
      )
    })
  },
  removeSubscription: managerId => _e =>
    dispatch(api.actions.removeStripeSubscription(managerId)),
  updateManagerPricing: pricingId => _e => {
    dispatch(
      api.actions.updateManagerPricing(props.currentManager.id, { pricingId }),
    )
    props.setCurrentManager(null)
  },
  removeManagerPricing: () => _e => {
    dispatch(api.actions.removeManagerPricing(props.currentManager.id))
    props.setCurrentManager(null)
  },
  setManagerToEditForm: manager => {
    let { id, name, email } = manager
    email = email || ''
    name = name || ''
    dispatch(actions.change('manager', { id, name, email }))
    props.setManagerToEdit(manager)
  },
  resetManagerForm: e => dispatch(actions.reset('manager')),
  saveManager: model => {
    const request = dispatch(api.actions.updateManagerInfo(model.id, {
        manager: {name: model.name}
      }))
      .then(_ => dispatch(actions.reset('manager')))
      .then(_ => props.setManagerToEdit(null))
    dispatch(actions.submit('manager', request, { fields: true }))
  },
})

export default compose(
  withState('currentManager', 'setCurrentManager', null),
  withState('removeManagerModalOpen', 'openRemoveManagerModal', false),
  withState('managerToRemove', 'setManagerToRemove', {}),
  withState('managerToEdit', 'setManagerToEdit', null),
  withState('toggledManager', 'setToggledManager', null),
  withHandlers({
    toggleRemoveManagerModal: ({ openRemoveManagerModal }) => e =>
      openRemoveManagerModal(current => !current),
  }),
  connect(
    selector,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadPricings()
    },
  }),
)
