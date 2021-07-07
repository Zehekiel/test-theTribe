import React, { useState } from 'react';
import logo from '../../logo.svg';
import './header.css';
import Linker from '../Linker/linker';

function Header() {
  const [log, setLog]= useState(false)

  return(
  <header className="App-header">
    <Linker to='/' >
      <span className="header-title">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React RPG Game
        </p>
      </span>
    </Linker>

    <Linker to='/'>
      <button className="header-button" style={{display: log? 'inline' : 'none'}} > Déconnexion </button>
    </Linker>

  </header>

  )
}

export default Header
