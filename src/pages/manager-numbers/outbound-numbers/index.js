import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VectorIcon from 'vector-icon'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import ErrorBox from 'components/error-box'
import NotifyBox from 'components/notify-box'
import DialogBoxButton from 'components/dialog-box/button'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import smartify from './smartify'

const OutboundNumbers = ({ submit, currentUser, selectedRep, setRep }) => (
  <div className="rounded-card">
    <div className="my-numbers-header">
      <div>Outbound Numbers</div>
      <div className="my-numbers-header-help">
        Inbound calls to purchased numbers will be forwarded to rep outbound
        numbers
      </div>
    </div>
    <div className="hide-on-desktop">
      <Table>
        <TableBody displayRowCheckbox={false}>
          {currentUser.salesReps.map(rep => (
            <TableRow
              key={rep.number}
              selectable={false}
              style={{
                borderBottom: '1px solid #fafafa',
              }}
            >
              <TableRowColumn>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <dl className="my-numbers-dl" style={{ width: '80%' }}>
                    <div>
                      <dt>
                        <UserIcon name="user" />
                        {rep.name}
                      </dt>
                      <dd>{rep.number}</dd>
                    </div>
                  </dl>
                  <div style={{ width: '20%', textAlign: 'right' }}>
                    <VectorIcon name="edit" onClick={e => setRep(rep)} />
                  </div>
                </div>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="hide-on-mobile">
      <Table
        height="calc(100vh - 340px)"
        wrapperStyle={{
          borderRadius: 5,
        }}
      >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow
            style={{
              borderBottom: '1px solid #fafafa',
            }}
          >
            <TableHeaderColumn>
              <UserIcon
                name="user"
                style={{ position: 'relative', bottom: -2, left: -5 }}
              />
              Rep name
            </TableHeaderColumn>
            <TableHeaderColumn>
              <VectorIcon
                name="call"
                style={{ position: 'relative', bottom: -2, left: -5 }}
              />
              Outbound Number
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {currentUser.salesReps.map(rep => (
            <TableRow
              key={rep.number}
              selectable={false}
              style={{
                height: 99,
                borderBottom: '1px solid #fafafa',
              }}
            >
              <TableRowColumn
                style={{
                  fontSize: 20,
                  letterSpacing: 0.8,
                  color: '#5cbece',
                }}
              >
                {rep.name}
              </TableRowColumn>
              <TableRowColumn
                style={{
                  fontSize: 20,
                  letterSpacing: 0.8,
                  color: '#5cbece',
                }}
              >
                <OutboundNumber title={rep.number} onClick={() => setRep(rep)}>
                  {rep.number}
                  <VectorIcon name="edit" />
                </OutboundNumber>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <NotifyBox
      open={!!selectedRep}
      onRequestClose={() => setRep(null)}
      overlayStyle={{
        opacity: 1,
      }}
      actions={[
        <DialogBoxButton
          key="cancel"
          label="cancel"
          onClick={() => setRep(null)}
          hoverColor="#eaeaea"
          style={{ borderRight: '1px solid #cecece' }}
        />,
        <DialogBoxButton
          form="outbound-number-form"
          hoverColor="#eaeaea"
          key="change"
          label="change"
          type="submit"
        />,
      ]}
    >
      Change outbound number for <b>{selectedRep && selectedRep.name}</b>
      <Form
        id="outbound-number-form"
        model="rep"
        onSubmit={submit(selectedRep)}
      >
        <InputText
          defaultValue={selectedRep && selectedRep.number}
          fullWidth
          model=".rep.forwardingNumberAttributes.number"
          required
        />
      </Form>
      <ErrorBox model="rep.commonErrors" show />
    </NotifyBox>
  </div>
)

OutboundNumbers.propTypes = {
  currentUser: PropTypes.object.isRequired,
  selectedRep: PropTypes.any,
  setRep: PropTypes.func,
  submit: PropTypes.func.isRequired,
}

const OutboundNumber = styled.div`
  cursor: pointer;
  > svg {
    margin-left: 8px;
    path {
      opacity: 0;
    }
  }
  &:hover {
    > svg {
      path {
        opacity: 1;
      }
    }
  }
`

const UserIcon = styled(VectorIcon)`
  > path {
    fill: #000;
    opacity: 0.4;
  }
`

export default smartify(OutboundNumbers)
