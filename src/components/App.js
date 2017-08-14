import React, { Component } from 'react'
import DraftEditor from './Draft'
import logo from '../logo.svg'
import '../styles/App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>DraftJs with plugins Example</h2>
        </div>
        <DraftEditor />
      </div>
    )
  }
}

export default App
