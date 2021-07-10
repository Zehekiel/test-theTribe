import React from 'react'
import logo from '../../asset/logo.svg'
import './header.css'
import Linker from '../Linker/linker'
import { UserTokenType } from '../../constant/type'
import { deleteToken } from '../../toolkit/userToken'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'

function Header() {
  const token = useAppSelector((state: UserTokenType) => state.userToken.value)
  const history = useHistory()
  const dispatch = useAppDispatch()

  function onClickLogOut (){
    dispatch(deleteToken())
    history.push('/')
  }

  return(
    <header className="App-header" data-testid='header'>
      <Linker to='/' >
        <span className="header-title">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          React RPG Game
          </p>
        </span>
      </Linker>

      <Linker to='/'>
        <button 
          className="header-button" 
          style={{display: token !=='' ? 'inline' : 'none'}}
          onClick= {()=> onClickLogOut() }
        > 
        Déconnexion
        </button>
      </Linker>

    </header>

  )
}

export default Header
