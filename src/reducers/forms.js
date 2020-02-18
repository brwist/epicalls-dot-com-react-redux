import { createForms } from 'react-redux-form'
import moment from 'moment'

export default createForms({
  search: {
    query: '',
  },
  searchManagers: {
    query: '',
  },
  searchAdmins: {
    query: '',
  },
  searchContacts: {
    query: '',
  },
  searchCallLogs: {
    query: '',
  },
  searchManagerCallLogs: {
    query: '',
  },
  searchReps: {
    query: '',
  },
  contact: {
    id: '',
    name: '',
    number: '',
    email: '',
  },
  validationCode: {
    code: '',
  },
  forwardingNumber: {
    number: '',
  },
  call: {
    countryCode: '',
    number: '',
    notes: '',
    name: '',
  },
  login: {
    auth: {
      email: '',
      password: '',
    },
  },
  signup: {
    user: {
      firstName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      companyAttributes: {
        name: '',
        url: '',
      },
    },
  },
  rep: {
    rep: {
      firstName: '',
      email: '',
      forwardingNumberAttributes: {
        number: '',
      },
    },
  },
  manager: {
    manager: {
      firstName: '',
      email: '',
      companyId: '',
    },
  },
  admin: {
    admin: {
      firstName: '',
      email: '',
    },
  },
  passwordReset: {
    email: '',
    id: '',
    user: {
      password: '',
      passwordConfirmation: '',
    },
  },
  resetPassword: {
    email: '',
  },
  changeUserFirstName: {
    user: { firstName: '' },
  },
  changeUserEmail: {
    id: '',
  },
  removeUserEmail: {
    id: '',
  },
  changeUserPassword: {
    user: {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  },
  addUserEmail: {
    email: { email: '' },
  },
  webhook: {
    webhook: {
      link: '',
      webhookActionId: '',
    },
  },
  testWebhook: {
    body: '{"action": "item changed", "data": "action details"}',
  },
  importContacts: {
    contacts: {},
    commonErrors: {},
  },
  upcomingCall: {
    name: '',
    number: '',
    source: '',
    reason: '',
    scheduledAt: moment(new Date())
      .add(1, 'days')
      .toDate()
      .toJSON(),
    scheduledAtTime: new Date().toJSON(),
  },
  pricing: {
    pricing: {
      name: '',
      showOnPricing: true,
      pricePerSit: '',
      pricePerLocalNumber: '',
      pricePerThousandMinutes: '',
      managerIds: [],
    },
  },
  planEdit: {
    amount: '',
  },
  pricingEdit: {
    pricing: {
      managerIds: [],
    },
  },
  message: {
    message: {
      message: '',
      contactId: '',
    },
  },
  messagesSearchContact: {
    query: '',
  },
  messagesSearchMessage: {
    query: '',
  },
  planhat: {
    planhatApiKey: '',
  },
})
