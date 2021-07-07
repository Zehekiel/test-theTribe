import React from 'react';
import {
  Switch,
  Route,
  Router,
  useHistory,
} from "react-router-dom";
import './App.css';
import Header from './components/header/header';
import Character from './screen/character/character'
import CharactersList from './screen/charactersList/charactersList';
import LogInLogOut from './screen/login&logout/logIn&logOut'
import NewCharacter from './screen/newCharacter/newCharacter';

function App() {
  const history = useHistory()
  return (
    <div className="App">
      <Header />
      <Router history={history}>
        <Switch>

          <Route exact path="/">
            <LogInLogOut />
          </Route>

          <Route path="/characters">
            <CharactersList />
          </Route>

          <Route path="/newcharacter">
            <NewCharacter />
          </Route>

          <Route path="/character">
            <Character />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
