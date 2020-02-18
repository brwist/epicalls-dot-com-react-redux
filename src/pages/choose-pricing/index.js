import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { Redirect } from 'react-router-dom'
import api from 'api'

const mapDispatchToProps = (dispatch, props) => ({
  choosePricingFromRouterParams: () =>
    dispatch(api.actions.choosePricing({ link: props.match.params.link })),
})

const ChoosePricing = () => <Redirect to="/my-account" />

ChoosePricing.propTypes = {
  match: PropTypes.any,
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.choosePricingFromRouterParams()
    },
  }),
)(ChoosePricing)
