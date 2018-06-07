import React from 'react'
import ReactDOM from 'react-dom'

import { acorn } from './seeds'
import Game from './game'
import Node from './node'

import Dashboard from './dashboard'

import './index.css'

const screenWidth = Math.floor(window.innerWidth / Game.lifeSize)
const screenHeight = Math.floor(window.innerHeight / Game.lifeSize)

const baseX = Math.floor(screenWidth / 2)
const baseY = Math.floor(screenHeight / 2)

const game = new Game(Node.applySet(acorn, baseX, baseY))
game.play()

ReactDOM.render(
  <div id="subroot">
    <Dashboard game={game} />
  </div>,
  document.getElementById('root')
)
