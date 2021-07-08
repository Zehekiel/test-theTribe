import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import subscription from '../../API/subscription'
import { User } from '../../class/user'
import ErrorText from '../../components/errorText/errorText'
import './logInLogOut.css'


function LogInLogOut() {
  const [userLog, setUserLog] = useState(new User())
  const [newUser, setNewUser] = useState(new User())
  const [errorSubscriptionMessage, setErrorSubscriptionMessage] = useState('')

  const history = useHistory();

  function logIn (){
    history.push('/characters')
  }

  function isSubscriptionFormIsValid (): boolean{
    if (newUser.nickname === ''){
      setErrorSubscriptionMessage("Il manque le pseudo")
      return false
    }

    if (newUser.password === ''){
      setErrorSubscriptionMessage("Il manque le mot de passe")
      return false
    }

    if (newUser.password.length < 6){
      setErrorSubscriptionMessage("Le mot de passe doit au moins 6 caractères minimum")
      return false
    }

    setErrorSubscriptionMessage("")
    return true
  }

  async function onClickSubscription (){
    if(isSubscriptionFormIsValid()){
      await subscription(newUser.nickname, newUser.password)
      .then((apiresponse)=>{
      console.log(".then ~ apiresponse", apiresponse);
            // history.push('/characters')
      })

    }
  }

  return (
  <main className='logContainer' >
    <section className='logSection'>
      <h1 className='logTitle'>Connexion</h1>
      <input
        type='text'
        placeholder='Pseudo'
        value={userLog.nickname}
        onChange={(e)=> setUserLog(old =>( {...old, 'nickname': e.target.value})) }
        className='logInput'
      />
      <input
        type='password'
        placeholder='Mot de passe'
        value={userLog.password}
        onChange={(e)=> setUserLog(old =>( {...old, 'password': e.target.value})) }
        className='logInput'
      />
      <button className='logButton' onClick={()=> logIn()}>Connexion</button>

    </section>

    <section className='logSection'>
      <h1 className='logTitle'>Inscription</h1>
      <input
        type='text'
        placeholder='Pseudo'
        value={newUser.nickname}
        onChange={(e)=> setNewUser(old =>( {...old, 'nickname': e.target.value})) }
        className='logInput'
      />
      <input
        type='password'
        placeholder='Mot de passe'
        value={newUser.password}
        onChange={(e)=> setNewUser(old =>( {...old, 'password': e.target.value})) }
        className='logInput'
      />
      <ErrorText text={errorSubscriptionMessage}/>
      <button className='logButton' onClick={()=> onClickSubscription()}>Suivant</button>

    </section>

  </main>
  )

}

export default LogInLogOut
