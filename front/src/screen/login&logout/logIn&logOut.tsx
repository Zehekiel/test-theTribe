import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { User } from '../../class/user'
import './logInLogOut.css'


function LogInLogOut() {
  const [userLog, setUserLog] = useState(new User())
  const [newUser, setNewUser] = useState(new User())
  const history = useHistory();

  function logIn (){
    history.push('/characters')
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
      <button className='logButton' onClick={()=> logIn()}>Suivant</button>

    </section>

  </main>
  )

}

export default LogInLogOut
