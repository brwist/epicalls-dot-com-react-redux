import React from 'react'
import PropTypes from 'prop-types'
import SubMenu from 'components/sub-menu'
import Button from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import smartify from './smartify'
import './styles.css'

const Pricing = ({ currentUser, match, plans, choosePricing }) => {
  const currentPricingId = currentUser.pricing && currentUser.pricing.id
  return (
    <div>
      {currentPricingId && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SubMenu
            path={match.path}
            role={currentUser.role}
            unreadMessagesCount={currentUser.unreadMessagesCount}
          />
        </div>
      )}
      <div className="shadow">
        {plans.length === 0 && (
          <div className="no-plans">no plans to select</div>
        )}
        <div className="pricing-plans">
          {plans.map(plan => (
            <Paper className="pricing-plan" key={plan.id}>
              <div className="plan-title">{plan.name}</div>
              <div className="plan-monthly">monthly</div>
              <div className="plan-per-user-wrapper">
                <div className="plan-per-user-price">
                  ${plan.pricePerSit.toFixed(2)} USD
                </div>
                <div className="plan-per-user-desc">per user</div>
              </div>
              <div className="plan-per-local-number-price">
                ${plan.pricePerLocalNumber.toFixed(2)} USD / local number
              </div>
              <div className="plan-per-thousand-minutes-price">
                ${plan.pricePerThousandMinutes.toFixed(2)} USD / 1000 minutes
              </div>
              <div>
                <Button
                  label="select"
                  onClick={choosePricing(plan.id)}
                  primary
                  disabled={plan.id === currentPricingId}
                />
              </div>
              {plan.id === currentPricingId && (
                <div className="plan-current-pricing">
                  <sup>*</sup>
                  current plan
                </div>
              )}
            </Paper>
          ))}
        </div>
      </div>
    </div>
  )
}

Pricing.propTypes = {
  choosePricing: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  plans: PropTypes.array.isRequired,
}

export default smartify(Pricing)
