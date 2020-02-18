import React from 'react'
import PropTypes from 'prop-types'
import SubMenu from 'components/sub-menu'
import { Form } from 'react-redux-form'
import InputText from 'components/input-text'
import InputSelect from 'components/input-select'
import MenuItem from 'material-ui/MenuItem'
import ErrorBox from 'components/error-box'
import IconButton from 'material-ui/IconButton'
import VectorIcon from 'vector-icon'
import AlertBox from 'components/alert-box'
import InfoBox from 'components/info-box'
import DialogBoxButton from 'components/dialog-box/button'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table'
import AddButton from 'components/add-button'
import smartify from './smartify'

const Webhooks = ({
  currentUser,
  match,
  submit,
  webhookActions,
  webhookToRemove,
  setWebhookToRemove,
  removeWebhook,
  webhookToTest,
  setWebhookToTest,
  testWebhook,
  closeTestWebhook,
  closeWebhook,
  openAddNewModal,
  setAddNewModal,
}) => (
  <div>
    <div className="header-and-action hide-on-desktop">
      <h2>Webhooks</h2>
      <AddButton onClick={() => setAddNewModal(true)} />
    </div>
    <SubMenu
      path={match.path}
      role={currentUser.role}
      unreadMessagesCount={currentUser.unreadMessagesCount}
    />
    <div className="hide-on-desktop">
      <Table>
        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {currentUser.webhooks.map(webhook => (
            <TableRow
              displayBorder={false}
              key={webhook.id}
              onClick={e => {
                e.stopPropagation()
                setWebhookToTest(webhook)
              }}
            >
              <TableRowColumn>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <dl
                    className="mobile-table-dl webhook"
                    style={{ width: '80%' }}
                  >
                    <div>
                      <dt>Link</dt>
                      <dd>{webhook.link}</dd>
                    </div>
                    <div>
                      <dt>Action</dt>
                      <dd>{webhook.name}</dd>
                    </div>
                  </dl>
                  <div style={{ width: '20%', textAlign: 'right' }}>
                    <IconButton
                      onClick={e => {
                        e.stopPropagation()
                        setWebhookToRemove(webhook)
                      }}
                    >
                      <VectorIcon hovered="trashed" name="trash" />
                    </IconButton>
                  </div>
                </div>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="shadow hide-on-mobile">
      <Table
        bodyStyle={{ minWidth: 870 }}
        className="webhooks-table"
        fixedFooter
        fixedHeader
        height="calc(100vh - 280px)"
        wrapperStyle={{ minWidth: 870 }}
      >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Url</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 200 }}>Action</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 100 }} />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {currentUser.webhooks.map(webhook => (
            <TableRow
              displayBorder={false}
              key={webhook.id}
              onClick={e => {
                e.stopPropagation()
                setWebhookToTest(webhook)
              }}
            >
              <TableRowColumn>{webhook.link}</TableRowColumn>
              <TableRowColumn style={{ width: 200 }}>
                {webhook.name}
              </TableRowColumn>
              <TableRowColumn style={{ width: 100, textAlign: 'center' }}>
                <IconButton
                  onClick={e => {
                    e.stopPropagation()
                    setWebhookToRemove(webhook)
                  }}
                >
                  <VectorIcon hovered="trashed" name="trash" />
                </IconButton>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow>
            <TableRowColumn colSpan={5} style={{ textAlign: 'center' }}>
              <AddButton
                onClick={() => setAddNewModal(true)}
                label="New Webhook"
              />
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
    <AlertBox
      open={!!webhookToRemove}
      yesAction={removeWebhook}
      onRequestClose={closeWebhook}
    >
      Are you sure you want to remove webhook?
    </AlertBox>
    {webhookToTest && (
      <InfoBox
        open={!!webhookToTest}
        onRequestClose={closeTestWebhook}
        actions={[
          <DialogBoxButton
            key="cancel"
            label="cancel"
            onClick={closeTestWebhook}
            style={{ borderRight: '1px solid #eee' }}
          />,
          <DialogBoxButton
            form="test-webhook-form"
            key="send"
            label="send"
            type="submit"
          />,
        ]}
      >
        <h2>Send test data</h2>
        <Form model="testWebhook" onSubmit={testWebhook} id="test-webhook-form">
          <InputText
            fullWidth
            hintText="JSON string"
            model=".body"
            multiLine
            required
            rows={3}
          />
          <ErrorBox model="testWebhook.commonErrors" show />
        </Form>
        <p>
          Webhook URL: <b>{webhookToTest.link}</b>
        </p>
      </InfoBox>
    )}
    <InfoBox
      open={openAddNewModal}
      onRequestClose={e => setAddNewModal(false)}
      modal
      actions={[
        <DialogBoxButton
          key="cancel"
          label="cancel"
          onClick={e => setAddNewModal(false)}
          style={{ borderRight: '1px solid #eee' }}
        />,
        <DialogBoxButton
          form="add-webhook-form"
          key="add"
          label="add"
          type="submit"
        />,
      ]}
    >
      <h2>Add New Webhook</h2>
      <Form model="webhook" onSubmit={submit} id="add-webhook-form">
        <InputText
          floatingLabelText="Url"
          fullWidth
          hintText="Valid URL"
          model=".webhook.link"
          required
        />
        <InputSelect
          floatingLabelText="Action"
          fullWidth
          model=".webhook.webhookActionId"
          required
        >
          {webhookActions.map(a => (
            <MenuItem key={a.id} primaryText={a.name} value={a.id} />
          ))}
        </InputSelect>
        <ErrorBox model="webhook.commonErrors" show />
      </Form>
    </InfoBox>
  </div>
)

Webhooks.propTypes = {
  closeTestWebhook: PropTypes.func.isRequired,
  closeWebhook: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  openAddNewModal: PropTypes.bool.isRequired,
  removeWebhook: PropTypes.func.isRequired,
  setAddNewModal: PropTypes.func.isRequired,
  setWebhookToRemove: PropTypes.func.isRequired,
  setWebhookToTest: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  testWebhook: PropTypes.func.isRequired,
  webhookActions: PropTypes.array.isRequired,
  webhookToRemove: PropTypes.any,
  webhookToTest: PropTypes.any,
}

export default smartify(Webhooks)
