import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css'
import Header from '../../components/header/header'
import Character from '../character/character'
import CharactersList from '../charactersList/charactersList'
import LogInLogOut from '../login&logout/logIn&logOut'
import FindOpponent from '../findOpponent/findOpponent'
import Figth from '../fight/fight'

function App() {
  const history = createBrowserHistory()

  return (
    <>
      <Router history={history}>
        <Header />
        <main className="App">
          <Switch>
            <Route exact path="/">
              <LogInLogOut />
            </Route>
            <Route path="/characterlist">
              <CharactersList />
            </Route>
            <Route path="/character/:id">
              <Character />
            </Route>
            <Route path="/findopponent">
              <FindOpponent />
            </Route>
            <Route path="/fight/:id">
              <Figth />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  )
}

export default App
