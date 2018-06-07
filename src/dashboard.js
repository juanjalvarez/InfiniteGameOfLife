import React, { Component } from 'react'
import Game from './game'

export default class Dashboard extends Component {

  intervalId = null

  state = {
    speed: 50
  }

  componentDidMount = () => {
    this.intervalId = setInterval(() => this.forceUpdate(), 250)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  handleSpeedChange = e => {
    const speed = e.target.value
    this.setState({
      speed
    })
    this.props.game.setSpeed(speed)
  }

  render = () => {
    const { game } = this.props
    return (
      <div className="dashboard">
        {
          game.isPlaying() ? (
            <button onClick={game.pause}>Pause</button>
          ) : (
            <button onClick={game.play}>Play</button>
          )
        }
        <div><strong>Cycle</strong> #{Game.cycles}</div>
        <div><strong>Lives</strong>: {game.nodes.length}</div>
        <div>
          speed {this.state.speed}ms <input type="range" min="10" max="250" value={this.state.speed} onChange={this.handleSpeedChange} />
        </div>
      </div>
    )
  }
}
