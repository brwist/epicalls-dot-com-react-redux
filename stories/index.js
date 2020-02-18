import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

import Title from '../src/widgets/call-modal-incoming/title'
import CallInfo from '../src/widgets/call-modal-incoming/call-info'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ))

storiesOf('Call modal incoming title', module).add('base', () => (
  <Title contact="+1123123123" contactInfo={{ id: 1, name: 'Sam' }} onAir />
))

const callInfo = JSON.parse(
  '{"id":980190962,"name":"MyString","number":"+1 714-781-4636","repId":846114006,"email":null,"country":"US","geoName":"Anaheim, CA","areaCode":"714","timezone":"America/Los_Angeles","totalCalls":1,"lastMessage":"my first message","lastContacted":"2018-09-19T11:20:35.240Z","messagesCount":2,"createdAt":"2018-09-19T11:20:35.069Z","updatedAt":"2018-09-19T11:20:35.069Z","rep":{"name":"Jon","number":"+17787569045","email":"jondoe@yahoo.com"}}',
)

storiesOf('Call modal call info', module)
  .add('base', () => <CallInfo />)
  .add('with data', () => <CallInfo {...callInfo} />)
