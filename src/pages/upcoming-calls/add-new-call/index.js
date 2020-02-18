import React from 'react'
import PropTypes from 'prop-types'
import DialogBox from 'components/dialog-box'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import DialogBoxButton from 'components/dialog-box/button'
import InputAutocomplete from 'components/input-autocomplete'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import moment from 'moment'
import ErrorBox from 'components/error-box'
import smartify from './smartify'

const AddNewCall = ({
  submit,
  dataSource,
  setNumber,
  setName,
  setScheduledAt,
  setScheduledAtTime,
  ...rest
}) => (
  <DialogBox
    actions={[
      <DialogBoxButton
        key="close-new-button"
        label="close"
        onClick={rest.onRequestClose}
        style={{ borderRight: '1px solid #cecece' }}
      />,
      <DialogBoxButton
        form="new-upcoming-call"
        key="add-new-button"
        label="add"
        type="submit"
      />,
    ]}
    title="Add New Call"
    titleStyle={{ textAlign: 'center' }}
    {...rest}
  >
    <Form
      id="new-upcoming-call"
      model="upcomingCall"
      onSubmit={submit}
      style={{
        borderBottom: '1px solid #cecece',
        padding: '0 40px 1rem',
      }}
    >
      <InputAutocomplete
        dataSource={dataSource}
        floatingLabelText="Contact name or number"
        fullWidth
        hintText="Start typing to get hints"
        model=".number"
        onNewRequest={setNumber}
        onUpdateInput={setName}
      />
      <InputText floatingLabelText="Source" fullWidth model=".source" />
      <InputText floatingLabelText="Reason" fullWidth model=".reason" />
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, paddingRight: 16 }}>
          <DatePicker
            autoOk
            defaultDate={moment(new Date())
              .add(1, 'days')
              .toDate()}
            floatingLabelText="Scheduled at"
            fullWidth
            onChange={setScheduledAt}
          />
        </div>
        <div style={{ flexGrow: 1, paddingLeft: 16 }}>
          <TimePicker
            autoOk
            defaultTime={new Date()}
            floatingLabelText="Time"
            fullWidth
            onChange={setScheduledAtTime}
          />
        </div>
      </div>
      <ErrorBox model="upcomingCall.commonErrors" show />
    </Form>
  </DialogBox>
)

AddNewCall.propTypes = {
  dataSource: PropTypes.array.isRequired,
  setName: PropTypes.func.isRequired,
  setNumber: PropTypes.func.isRequired,
  setScheduledAt: PropTypes.func.isRequired,
  setScheduledAtTime: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
}

export default smartify(AddNewCall)
