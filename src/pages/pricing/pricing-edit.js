import React from 'react'
import PropTypes from 'prop-types'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import Checkbox from 'material-ui/Checkbox'

const PricingEditModal = ({
  open,
  close,
  submit,
  managers,
  currentPricing,
}) => (
  <InfoBox
    open={open}
    onRequestClose={close}
    autoScrollBodyContent
    actions={[<DialogBoxButton key="close" label="close" onClick={close} />]}
  >
    <h2>Choose Managers</h2>

    {managers.map(manager => (
      <div key={manager.id}>
        <Checkbox
          defaultChecked={
            !!currentPricing.managers.find(m => m.id === manager.id)
          }
          label={manager.name}
          onCheck={submit(currentPricing.id, manager.id)}
        />
      </div>
    ))}
  </InfoBox>
)

PricingEditModal.propTypes = {
  close: PropTypes.func.isRequired,
  currentPricing: PropTypes.object,
  managers: PropTypes.array,
  open: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
}

export default PricingEditModal
