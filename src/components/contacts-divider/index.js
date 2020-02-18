import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableRowColumn } from 'material-ui/Table'

const ContactsDivider = ({ letter, colSpan }) => (
  <TableRow
    displayBorder={false}
    hoverable={false}
    selected={false}
    striped={false}
    style={{ backgroundColor: '#fff' }}
  >
    <TableRowColumn
      style={{
        width: 20,
        fontSize: 23,
        fontWeight: 300,
        color: '#9e9e9e',
        textTransform: 'uppercase',
      }}
    >
      {letter}
    </TableRowColumn>
    <TableRowColumn
      colSpan={colSpan - 1}
      style={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <div
        style={{ width: '100%', height: 6, borderBottom: '1px solid #dbdbdb' }}
      />
    </TableRowColumn>
  </TableRow>
)

ContactsDivider.propTypes = {
  colSpan: PropTypes.number.isRequired,
  letter: PropTypes.string.isRequired,
}

export default ContactsDivider
