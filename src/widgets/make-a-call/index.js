import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import RoundedRaisedButton from 'components/rounded-raised-button'
import ErrorBox from 'components/error-box'
import VectorIcon from 'vector-icon'
import NotifyBox from 'components/notify-box'
import AlertBox from 'components/alert-box'
import DialPad from 'components/dial-pad'
import InputSelect from 'components/input-select'
import MenuItem from 'material-ui/MenuItem'
import smartify from './smartify'

const MakeACall = ({
  submit,
  clientNumber,
  twilioProcessLog,
  purchaseModalOpen,
  togglePurchaseModal,
  purchaseInfo,
  purchaseNumber,
  resetCallForm,
  myNewContact,
  setMyNewContact,
  dialPadOpen,
  openDialPad,
  closeDialPad,
  clientNumberError,
  setCountryCode,
  setCountryCodeFromNumber,
  callTo,
  callApiNumber,
  twilioCountries,
  twilioCountryCodes,
}) => (
  <div>
    <h2 className="hide-on-mobile">
      Make a <span className="bolder">Call</span>
    </h2>
    <DialPad open={dialPadOpen} onRequestClose={closeDialPad} />
    <Form
      id="make-a-call-form"
      model="call"
      onSubmit={submit}
      style={{
        position: 'relative',
      }}
    >
      <VectorIcon
        name="keyboard"
        style={{
          position: 'absolute',
          top: 90,
          right: 18,
          zIndex: 100,
          cursor: 'pointer',
        }}
        onClick={openDialPad}
      />
      <InputSelect
        afterChange={setCountryCode(clientNumber, twilioCountryCodes)}
        defaultValue={1}
        floatingLabelText="Country Code"
        fullWidth
        model=".countryCode"
        required
      >
        <MenuItem
          primaryText={
            <span>
              <CountryCode>+1</CountryCode>
              USA and Canada
            </span>
          }
          value={1}
        />
        <MenuItem
          primaryText={
            <span>
              <CountryCode>+44</CountryCode>
              Great Britain
            </span>
          }
          value={44}
        />
        {twilioCountries.map(({ isoCountry, country, countryCode }) => (
          <MenuItem
            key={isoCountry}
            primaryText={
              <span>
                <CountryCode>+{countryCode}</CountryCode>
                {country}
              </span>
            }
            value={+countryCode}
          />
        ))}
      </InputSelect>
      <InputText
        defaultValue="+1"
        errorText={clientNumberError}
        fullWidth
        hintText={
          <span>
            <VectorIcon
              name="phone"
              style={{ position: 'relative', marginRight: 6, marginLeft: 4 }}
            />
            Phone Number
          </span>
        }
        model=".number"
        onChange={setCountryCodeFromNumber(twilioCountryCodes)}
        required
        validators={{
          correctNumber: val => /^[0-9()+-\s]+$/.test(val),
          hasCountryCode: val =>
            new RegExp(`^\\+(${twilioCountryCodes.join('|')})`).test(val),
        }}
      />
      <InputText
        fullWidth
        hintText={
          <span>
            <UserIcon
              name="user"
              style={{ position: 'relative', marginRight: 4, marginLeft: 4 }}
            />
            Full Name <span style={{ fontSize: 12 }}>optional</span>
          </span>
        }
        model=".name"
      />
      <ErrorBox model="call.commonErrors" show />
      <ErrorBox model="contact.commonErrors" show />
    </Form>
    <div style={{ height: '2rem' }} />
    <RoundedRaisedButton
      form="make-a-call-form"
      fullWidth
      label={
        <span>
          <WhiteCall name="call" style={{ marginRight: 6 }} />
          New Call
        </span>
      }
      primary
      type="submit"
    />
    {callApiNumber && (
      <div>
        <div style={{ height: '2rem' }} />
        <p>
          To call you contact from mobile or landline call {callApiNumber} and
          enter contact id
        </p>
      </div>
    )}
    <div style={{ height: '2rem' }} />
    <div>
      {twilioProcessLog.map((message, i) => (
        <p key={i}>&gt; {message}</p>
      ))}
    </div>
    <NotifyBox
      open={!!myNewContact}
      onRequestClose={() => setMyNewContact(null)}
    >
      <b>{myNewContact && myNewContact.name}</b> added!
    </NotifyBox>
    <AlertBox
      open={purchaseModalOpen}
      onRequestClose={togglePurchaseModal}
      yesAction={purchaseNumber}
    >
      {purchaseInfo.error
        ? purchaseInfo.error
        : `You dont have a phone with the area code ${
            purchaseInfo.areaCode
          } in ${purchaseInfo.country}, would you like to purchase a number?`}
    </AlertBox>
  </div>
)

const WhiteCall = styled(VectorIcon)`
  path {
    fill: #fff;
  }
`

const UserIcon = styled(VectorIcon)`
  > path {
    fill: #000;
    opacity: 0.4;
  }
`

const CountryCode = styled.span`
  display: inline-block;
  width: 40px;
`

MakeACall.propTypes = {
  callApiNumber: PropTypes.string,
  callTo: PropTypes.object,
  clientNumber: PropTypes.string,
  clientNumberError: PropTypes.string,
  closeDialPad: PropTypes.func.isRequired,
  dialPadOpen: PropTypes.bool.isRequired,
  myNewContact: PropTypes.any,
  openDialPad: PropTypes.func.isRequired,
  purchaseInfo: PropTypes.object,
  purchaseModalOpen: PropTypes.bool.isRequired,
  purchaseNumber: PropTypes.func.isRequired,
  resetCallForm: PropTypes.func.isRequired,
  setCountryCode: PropTypes.func.isRequired,
  setCountryCodeFromNumber: PropTypes.func.isRequired,
  setMyNewContact: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  togglePurchaseModal: PropTypes.func.isRequired,
  twilioProcessLog: PropTypes.array,
  twilioCountries: PropTypes.array,
  twilioCountryCodes: PropTypes.array,
}

export default smartify(MakeACall)
