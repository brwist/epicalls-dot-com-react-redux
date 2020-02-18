import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { StripeProvider } from 'react-stripe-elements'
import Helmet from 'react-helmet'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { gray500 } from 'material-ui/styles/colors'
import { readCookie } from 'utils/manage-cookies'
import ActionCable from 'actioncable'
import api from 'api'
import jwtDecode from 'jwt-decode'
import { updateToken, loginAs, receiveMessage } from './actions'
import createStore from './utils/create-store'
import reducers from './reducers'
import Root from './root'
import './styles/index.css'
import './styles/desktop.css'
import './styles/mobile.css'

if (!process.env.STRIPE_API_KEY || process.env.STRIPE_API_KEY === '') {
  throw new Error('STRIPE_API_KEY is required')
}

let cableAddress = '/websocket'
if (process.env.API_URL) {
  cableAddress = `${process.env.API_URL.replace('https://', 'wss:').replace(
    'http://',
    'ws:',
  )}${cableAddress}`
}
const cable = ActionCable.createConsumer(cableAddress)

const muiTheme = getMuiTheme({
  palette: {
    textColor: gray500,
    primary1Color: '#56C2CD',
  },
  appBar: {
    color: '#fff',
    height: 46,
    textColor: gray500,
  },
  tableRow: {
    stripeColor: '#f8fafd',
  },
})

const store = createStore(reducers)
store.subscribe(store.getState)

const token = readCookie('token')
const secondaryToken = readCookie('secondary_token')

if (secondaryToken) {
  store.dispatch(loginAs(jwtDecode(secondaryToken).role))
}

if (secondaryToken || token) {
  store.dispatch(updateToken(secondaryToken || token))
}

cable.subscriptions.create('WebNotificationsChannel', {
  received: data => {
    if (data && data.reloadUser) {
      store.dispatch(api.actions.currentUser.get())
    }
    if (data.reloadContacts) {
      store.dispatch(api.actions.contacts.get())
      store.dispatch(api.actions.currentUser.get())
    }
    if (data.message) {
      store.dispatch(receiveMessage(data.message))
    }
  },
  // eslint-disable-next-line
  connected: () => console.log('connected'),
})

function Reporter(props) {
  throw props.error
}

const render = Component => {
  const app = (
    <AppContainer errorReporter={Reporter}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
          <div>
            <Helmet defaultTitle="Epicalls" titleTemplate="%s - Epicalls" />
            <Component store={store} />
          </div>
        </StripeProvider>
      </MuiThemeProvider>
    </AppContainer>
  )

  ReactDOM.render(app, document.getElementById('root'))
}

render(Root)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root')
    render(NewRoot)
  })
}
