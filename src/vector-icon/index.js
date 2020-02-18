import React from 'react'
import PropTypes from 'prop-types'

import call from './call.svg'
import download from './download.svg'
import hangUp from './hang-up.svg'
import mute from './mute.svg'
import muted from './muted.svg'
import play from './play.svg'
import playO from './play-o.svg'
import plus from './plus.svg'
import record from './record.svg'
import pin from './pin.svg'
import close from './close.svg'
import voiceWave from './voice-wave.svg'
import trash from './trash.svg'
import trashed2x from './trashed2x.svg'
import trashed from './trashed.svg'
import chevronLeft from './chevron-left.svg'
import edit from './edit.svg'
import tick from './tick.svg'
import search from './search.svg'
import handsetOnGreen from './handset-on-green.svg'
import user from './user.svg'
import phone from './phone.svg'
import envelope from './envelope.svg'
import menu from './menu.svg'
import submenu from './menu-submenu.svg'
import signOut from './sign-out.svg'
import myNumbers from './my-numbers.svg'
import keyboard from './keyboard.svg'

const list = {
  call,
  download,
  hangUp,
  mute,
  muted,
  play,
  playO,
  plus,
  record,
  pin,
  close,
  voiceWave,
  trash,
  trashed2x,
  trashed,
  chevronLeft,
  edit,
  tick,
  search,
  handsetOnGreen,
  user,
  phone,
  envelope,
  menu,
  submenu,
  signOut,
  myNumbers,
  keyboard,
}

const VectorIcon = ({ name, ...props }) => {
  if (!list[name]) {
    throw new Error(`Icon not found ${name}`)
  }
  return React.createElement(list[name], props)
}

VectorIcon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default VectorIcon
