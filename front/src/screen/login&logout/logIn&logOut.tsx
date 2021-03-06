import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { addKeyAndValue, useAppDispatch } from '../../hook'
import subscription from '../../API/user/subscription'
import { User } from '../../class/user'
import ErrorText from '../../components/errorText/errorText'
import { saveToken } from '../../toolkit/userToken/userToken'
import './logInLogOut.css'

import { BreakPoint, isLargerThan } from '../../constant/breakpoint'
import { saveList } from '../../toolkit/userCharacterList/userCharacterList'
import { ProviderApi } from '../../constant/type'
import logIn from '../../API/user/login'
import { UserApi } from '../../class/userApi'

function LogInLogOut() {
  const [ userLog, setUserLog ] = useState(new UserApi())
  const [ newUser, setNewUser ] = useState(new User())
  const [ errorSubscriptionMessage, setErrorSubscriptionMessage ] = useState('')
  const [ errorLogMessage, setErrorLogMessage ] = useState('')

  const history = useHistory()
  const dispatch = useAppDispatch()

  function isSubscriptionFormIsValid(): boolean {
    if (newUser.nickname === '') {
      setErrorSubscriptionMessage('Il manque le pseudo')
      return false
    }

    if (newUser.password === '') {
      setErrorSubscriptionMessage('Il manque le mot de passe')
      return false
    }

    if (newUser.password.length < 6) {
      setErrorSubscriptionMessage(
        'Le mot de passe doit avoir au moins 6 caractères minimum'
      )
      return false
    }

    setErrorSubscriptionMessage('')
    return true
  }

  async function onClickSubscription() {
    if (isSubscriptionFormIsValid()) {
      await subscription(newUser.nickname, newUser.password).then(
        (apiresponse) => {
          if (apiresponse.success) {
            setErrorSubscriptionMessage('')
            dispatch(saveToken(apiresponse.message))
            history.push('/characterlist')
          } else {
            setErrorSubscriptionMessage(apiresponse.message)
          }
        }
      )
    }
  }

  function isLogInFormIsValid(): boolean {
    if (userLog.nickname === '') {
      setErrorLogMessage('Il manque le pseudo')
      return false
    }

    if (userLog.password === '') {
      setErrorLogMessage('Il manque le mot de passe')
      return false
    }

    if (userLog.password.length < 6) {
      setErrorLogMessage(
        'Le mot de passe doit avoir au moins 6 caractères minimum'
      )
      return false
    }

    setErrorLogMessage('')
    return true
  }

  async function onClickLogIn() {
    if (isLogInFormIsValid()) {
      await logIn(userLog.nickname, userLog.password).then(
        (apiresponse: ProviderApi) => {
          if (apiresponse.success) {
            const user: UserApi = JSON.parse(apiresponse.message)
            setErrorLogMessage('')
            dispatch(saveToken(user.token))
            dispatch(saveList(addKeyAndValue([ ... user.characterId ], 'selected', false)))
            history.push('/characterlist')
          } else {
            setErrorLogMessage(apiresponse.message)
          }
        }
      )
    }
  }

  return (
    <main
      className="logContainer"
      style={{
        flexDirection: isLargerThan(BreakPoint.Mobile) ? 'row' : 'column',
      }}
    >
      <section className="logSection">
        <h1 className="logTitle">Connexion</h1>
        <input
          type="text"
          placeholder="Pseudo"
          value={userLog.nickname}
          onChange={(e) =>
            setUserLog((old) => ({ ...old, nickname: e.target.value }))
          }
          className="logInput"
          data-testid='logInNickname'
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={userLog.password}
          onChange={(e) =>
            setUserLog((old) => ({ ...old, password: e.target.value }))
          }
          className="logInput"
          data-testid='logInPassword'

        />
        <ErrorText text={errorLogMessage} />
        <button className="logButton" onClick={() => onClickLogIn()}>
          Connexion
        </button>
      </section>

      <section className="logSection">
        <h1 className="logTitle">Inscription</h1>
        <input
          type="text"
          placeholder="Pseudo"
          value={newUser.nickname}
          onChange={(e) =>
            setNewUser((old) => ({ ...old, nickname: e.target.value }))
          }
          className="logInput"
          data-testid='subscriptionNickname'
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={newUser.password}
          onChange={(e) =>
            setNewUser((old) => ({ ...old, password: e.target.value }))
          }
          className="logInput"
          data-testid='subscriptionPassword'
        />
        <ErrorText text={errorSubscriptionMessage} />
        <button className="logButton" onClick={() => onClickSubscription()}>
          Suivant
        </button>
      </section>
    </main>
  )
}

export default LogInLogOut
