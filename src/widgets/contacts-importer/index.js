import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import { Form } from 'react-redux-form'
import RaisedButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeaderColumn,
  TableFooter,
} from 'material-ui/Table'
import TableHeader from 'material-ui/Table/TableHeader'
import smartify from './smartify'

const ContactImporter = ({
  open,
  onRequestClose,
  contacts,
  submit,
  toggle,
  rename,
  changePhone,
  ...rest
}) => (
  <Dialog
    open={open}
    onRequestClose={onRequestClose}
    bodyStyle={{ padding: 0 }}
    {...rest}
  >
    <Form model="importContacts" onSubmit={submit}>
      <Table bodyStyle={{ height: 550 }} fixedFooter fixedHeader>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: 30 }}>Add</TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'left' }}>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'left' }}>
              Phone
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {Object.keys(contacts).map(phone => (
            <TableRow
              displayBorder={false}
              id={phone}
              key={phone}
              selectable={false}
            >
              <TableRowColumn style={{ width: 30 }}>
                <Checkbox
                  id={`${phone}-checkbox`}
                  onCheck={toggle}
                  checked={contacts[phone].checked}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  id={`${phone}-name`}
                  value={contacts[phone].name}
                  onChange={rename}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  id={`${phone}-phone`}
                  value={contacts[phone].number}
                  onChange={changePhone}
                />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow>
            <TableRowColumn colSpan={3} style={{ textAlign: 'center' }}>
              <RaisedButton label="import new contacts" primary type="submit" />
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    </Form>
  </Dialog>
)

ContactImporter.propTypes = {
  changePhone: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  rename: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default smartify(ContactImporter)
