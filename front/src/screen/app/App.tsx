import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css'
import Header from '../../components/header/header'
import Character from '../character/character'
import CharactersList from '../charactersList/charactersList'
import LogInLogOut from '../login&logout/logIn&logOut'
import NewCharacter from '../newCharacter/newCharacter'

function App() {
  const history = createBrowserHistory()

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/">
            <LogInLogOut />
          </Route>

          <Route path="/characterlist">
            <CharactersList />
          </Route>

          <Route path="/newcharacter">
            <NewCharacter />
          </Route>

          <Route path="/character/:id">
            <Character />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
