import React from 'react'
import logo from '../../asset/logo.svg'
import './header.css'
import Linker from '../Linker/linker'
import { UserTokenType } from '../../constant/type'
import { deleteToken } from '../../toolkit/userToken/userToken'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { emptyList } from '../../toolkit/userCharacterList/userCharacterList'

function Header() {
  const token = useAppSelector((state: UserTokenType) => state.userToken.value)
  const history = useHistory()
  const dispatch = useAppDispatch()

  function onClickLogOut() {
    dispatch(deleteToken())
    dispatch(emptyList())
    history.push('/')
  }

  return (
    <header className="App-header" data-testid="header">
      <Linker to={token !== '' ? '/characterList' : '/' } >
        <span className="header-title" data-testid='reactLogo'>
          <img src={logo} className="App-logo" alt="logo" />
          <h3>React RPG Game</h3>
        </span>
      </Linker>

      <Linker to="/">
        <button
          className="header-button"
          style={{ display: token !== '' ? 'inline' : 'none' }}
          onClick={() => onClickLogOut()}
          data-testid='logOutButton'
        >
          Déconnexion
        </button>
      </Linker>
    </header>
  )
}

export default Header
