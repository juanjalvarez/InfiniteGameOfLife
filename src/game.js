import { isNegative } from './utils'
import Node from './node'

export default class Game {

  static timeoutId = null
  static canvas = document.getElementById('canvas')
  static cycles = 0
  static cycleDelay = 10
  static lifeSize = 4
  static debug = false
  static running = false

  screen = null
  neighborMap = new Map()
  nodes = []

  constructor(nodes) {
    this.screen = Game.canvas.getContext('2d')
    this.screen.width = window.innerWidth
    this.screen.height = window.innerHeight
    if (nodes) {
      this.nodes = nodes
    }
  }

  increaseNeighbors = (x, y) => {
    const key = `${x}_${y}`
    let val = this.neighborMap.get(key)
    if (!val) {
      val = 0
    }
    this.neighborMap.set(key, isNegative(val) ? val - 1 : val + 1)
  }

  calculateNextIteration = () => {
    const newList = []
    this.nodes.forEach(node => this.neighborMap.set(node.key(), -100))
    for (const node of this.nodes) {
      node.forEachNeighbor(this.increaseNeighbors)
    }
    for (const key of this.neighborMap.keys()) {
      const [x, y] = key.split('_').map(n => parseInt(n, 10))
      let rawNeighbors = this.neighborMap.get(key)
      const isAlive = isNegative(rawNeighbors)
      if (isAlive) {
        rawNeighbors += 100
      }
      const neighbors = isAlive ? -rawNeighbors : rawNeighbors
      if (
        neighbors === 3 ||
        (isAlive && neighbors === 2)
      ) {
        newList.push(new Node(x, y))
      }
    }
    this.neighborMap = new Map()
    this.nodes = newList
  }

  nextCycle = () => {
    Game.cycles++
    const screen = this.screen
    screen.clearRect(0, 0, screen.width, screen.height)
    screen.beginPath()
    // screen.font = '16px arial'
    // screen.fillText(`Cycle #${Game.cycles}`, 20, 40)
    for (const node of this.nodes) {
      screen.fillStyle = 'rgb(0,0,0)'
      const x = node.x * Game.lifeSize
      const y = node.y * Game.lifeSize
      screen.fillRect(x, y, Game.lifeSize, Game.lifeSize)
      if (Game.debug) {
        screen.fillStyle = 'rgb(255,0,0)'
        screen.font = '15px arial'
        screen.fillText(`${node.x}_${node.y}`, x + 10, y + 30)
      }
    }
    screen.stroke()
    this.calculateNextIteration()
    if (Game.running) {
      this.intervalId = setTimeout(this.nextCycle, Game.cycleDelay)
    }
  }

  play = (firstCycle = true) => {
    Game.running = true
    this.nextCycle()
  }

  pause = () => {
    Game.running = false
    clearTimeout(Game.timeoutId)
  }

  setSpeed = speed => {
    Game.cycleDelay = speed
  }

  isPlaying = () => {
    return Game.running
  }
}

Game.canvas.width = window.innerWidth
Game.canvas.height = window.innerHeight
