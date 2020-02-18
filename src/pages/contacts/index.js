import React from 'react'
import PropTypes from 'prop-types'
import MakeACall from 'widgets/make-a-call'
import { Link } from 'react-router-dom'
import ContactsDivider from 'components/contacts-divider'
import VectorIcon from 'vector-icon'
import moment from 'moment'
import 'moment-timezone'
import SubMenu from 'components/sub-menu'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table'
import AlertBox from 'components/alert-box'
import SearchForm from 'components/search-form'
import FlatButton from 'material-ui/FlatButton'
import ContactsImporter from 'widgets/contacts-importer'
import UploadFileButton from 'components/upload-file-button'
import Snackbar from 'material-ui/Snackbar'
import CountryFlag from 'components/country-flag'
import AddButton from 'components/add-button'
import smartify from './smartify'
import AddContactModal from './add-contact-modal'
import EditContactModal from './edit-contact-modal'

const Contacts = ({
  currentUser,
  contactsByAlphabet,
  callTo,
  contactToRemove,
  setContactToRemove,
  removeContact,
  match,
  importContactsDialogOpen,
  resetImportContactsForm,
  parseContactsFile,
  contactsParserError,
  contactToEdit,
  setContactToEditForm,
  resetContactForm,
  saveContact,
  setContactToEdit,
  addContactOpen,
  setAddContactOpen,
  addContact,
}) => {
  function renderContacts() {
    const rows = []
    Object.keys(contactsByAlphabet).map(key => {
      rows.push(<ContactsDivider colSpan={7} key={key} letter={key} />)
      rows.push(renderContactsArray(contactsByAlphabet[key]))
    })
    return rows
  }
  function renderContactsArray(contacts) {
    return contacts.map(entity => (
      <TableRow
        displayBorder={false}
        id={`contact-${entity.id}`}
        key={entity.id}
        onClick={() => {
          resetContactForm()
          setContactToEditForm(entity)
        }}
        selectable={false}
      >
        <TableRowColumn style={{ paddingLeft: 8, paddingRight: 0 }}>
          <VectorIcon
            className="handset-on-green"
            name="handsetOnGreen"
            onClick={callTo(entity)}
          />
        </TableRowColumn>
        <TableRowColumn style={{ paddingLeft: 0 }}>
          {entity.name}
        </TableRowColumn>
        <TableRowColumn>{entity.number}</TableRowColumn>
        <TableRowColumn>{entity.email}</TableRowColumn>
        <TableRowColumn>
          <CountryFlag country={entity.country} />
          &nbsp;
          <span style={{ color: '#a1a1a1' }}>Local Time:</span>{' '}
          {moment.tz(new Date(), entity.timezone).format('h:mm A')}
        </TableRowColumn>
        <TableRowColumn>{entity.id}</TableRowColumn>
        <TableRowColumn style={{ textAlign: 'center' }}>
          <VectorIcon
            name="trash"
            style={{ cursor: 'pointer' }}
            onClick={() => setContactToRemove(entity)}
          />
        </TableRowColumn>
      </TableRow>
    ))
  }
  function renderMobileContacts() {
    const rows = []
    Object.keys(contactsByAlphabet).map(key => {
      rows.push(<ContactsDivider colSpan={2} key={key} letter={key} />)
      rows.push(renderMobileContactsArray(contactsByAlphabet[key]))
    })
    return rows
  }
  function renderMobileContactsArray(contacts) {
    return contacts.map(entity => (
      <TableRow
        displayBorder={false}
        id={`mobile-contact-${entity.id}`}
        key={entity.id}
        onClick={callTo(entity)}
        selectable={false}
      >
        <TableRowColumn />
        <TableRowColumn style={{ paddingLeft: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <dl className="mobile-table-dl" style={{ flexGrow: 1 }}>
              <div>
                <dt>Name</dt>
                <dd>{entity.name}</dd>
              </div>
              <div>
                <dt>Number</dt>
                <dd>{entity.number}</dd>
              </div>
              {entity.email &&
                entity.email.length > 0 && (
                  <div>
                    <dt>Email</dt>
                    <dd>{entity.email}</dd>
                  </div>
                )}
              <div>
                <dt>Pin</dt>
                <dd>{entity.id}</dd>
              </div>
              <div>
                <dt>Local Time</dt>
                <dd>
                  {moment.tz(new Date(), entity.timezone).format('h:mm A')}
                </dd>
              </div>
            </dl>
            <div style={{ width: 30, textAlign: 'center' }}>
              <VectorIcon
                name="trash"
                style={{ cursor: 'pointer' }}
                onClick={() => setContactToRemove(entity)}
              />
            </div>
          </div>
        </TableRowColumn>
      </TableRow>
    ))
  }
  return (
    <div className="main-dashboard">
      <div className="header-and-action hide-on-desktop">
        <h2>Contacts</h2>
        <FlatButton
          containerElement={<Link to="/make-a-call" />}
          label="Make A Call"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SubMenu
          path={match.path}
          role={currentUser.role}
          unreadMessagesCount={currentUser.unreadMessagesCount}
        />
        <SearchForm model="searchContacts" />
      </div>
      <div />
      <div>
        <div className="hide-on-desktop">
          <Table>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {renderMobileContacts()}
              {Object.keys(contactsByAlphabet).length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    Contacts list is empty
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="shadow hide-on-mobile">
          <Table
            bodyStyle={{ minWidth: 870 }}
            className="contacts-table"
            fixedFooter
            fixedHeader
            height="calc(100vh - 221px)"
            wrapperStyle={{ backgroundColor: '#fff', minWidth: 870 }}
          >
            <TableBody
              className="first-row-padding"
              displayRowCheckbox={false}
              showRowHover
              stripedRows
            >
              {renderContacts()}
              {Object.keys(contactsByAlphabet).length === 0 && (
                <TableRow>
                  <TableRowColumn style={{ textAlign: 'center' }}>
                    Contacts list is empty
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
            <TableFooter adjustForCheckbox={false}>
              <TableRow>
                <TableRowColumn colSpan={5}>
                  <div
                    style={{
                      margin: '0 auto',
                      display: 'flex',
                      width: 300,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <AddButton
                      label="Contact"
                      onClick={() => {
                        resetContactForm()
                        setAddContactOpen(true)
                      }}
                    />
                    <div>or</div>
                    <UploadFileButton
                      label="import from file"
                      upload={parseContactsFile}
                    />
                  </div>
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <AlertBox
          open={!!contactToRemove}
          onRequestClose={() => setContactToRemove(null)}
          yesAction={removeContact}
        >
          Remove contact <b>{contactToRemove && contactToRemove.name}</b> ?
        </AlertBox>
        <ContactsImporter
          open={importContactsDialogOpen}
          onRequestClose={resetImportContactsForm}
        />
        {contactToEdit && (
          <EditContactModal
            contactToEdit={contactToEdit}
            saveContact={saveContact}
            setContactToEdit={setContactToEdit}
          />
        )}
        <AddContactModal
          open={addContactOpen}
          onRequestClose={() => setAddContactOpen(false)}
          addContact={addContact}
        />
        {contactsParserError && (
          <Snackbar
            autoHideDuration={10000}
            contentStyle={{
              color: 'rgb(255, 64, 129)',
            }}
            message={contactsParserError}
            onRequestClose={resetImportContactsForm}
            open={!!contactsParserError}
          />
        )}
      </div>
      <div className="hide-on-mobile">
        {currentUser.forwardingNumber &&
        currentUser.forwardingNumber.confirmed ? (
          <MakeACall />
        ) : (
          <FlatButton
            containerElement={<Link to="/my-numbers" />}
            fullWidth
            label="Confirm Outbound Number"
            secondary
          />
        )}
      </div>
    </div>
  )
}

Contacts.propTypes = {
  addContact: PropTypes.func.isRequired,
  addContactOpen: PropTypes.bool.isRequired,
  callTo: PropTypes.func.isRequired,
  contactToEdit: PropTypes.any,
  contactToRemove: PropTypes.object,
  contactsByAlphabet: PropTypes.object.isRequired,
  contactsParserError: PropTypes.any,
  currentUser: PropTypes.object.isRequired,
  importContactsDialogOpen: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  parseContactsFile: PropTypes.func.isRequired,
  removeContact: PropTypes.func.isRequired,
  resetContactForm: PropTypes.func.isRequired,
  resetImportContactsForm: PropTypes.func.isRequired,
  saveContact: PropTypes.func.isRequired,
  setAddContactOpen: PropTypes.func.isRequired,
  setContactToEdit: PropTypes.func.isRequired,
  setContactToEditForm: PropTypes.func.isRequired,
  setContactToRemove: PropTypes.func.isRequired,
}

export default smartify(Contacts)
