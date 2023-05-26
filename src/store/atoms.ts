import { atom } from 'recoil'
import { pagesexample, blankpage } from './exampledata'
import Page from 'interfaces'

const pages = atom({
  key: "page",
  default: []
})


const blockState = atom({
  key: 'blockState',
  default: blankpage as Page
})


const valueState = atom({
  key: 'valueState',
  default: ''
})


// State for the / click menu
const menuState = atom({
  key: 'menuState',
  default: {
    isActive: false,
    x: 0,
    y: 0
  }
})


// State for the right click menu
const rightMenuState = atom({
  key: 'rightMenuState',
  default: {
    isActive: false,
    currentBlockId: "" as string,
    x: 0,
    y: 0
  }
})


const placeHolder = atom({
  key: 'placeholder',
  default: {
    value: "'/' for commands",
    isActive: false
  }
})


const isEditable = atom({
  key: 'isEditable',
  default: true
})


const hamburgerMenuState = atom({
  key: 'hamburgerMenuState',
  default: true
})

export { blockState, valueState, menuState, rightMenuState, placeHolder, isEditable, pages, hamburgerMenuState }
