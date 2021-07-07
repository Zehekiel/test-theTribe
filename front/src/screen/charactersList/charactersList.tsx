import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Characters } from '../../class/character';


function CharactersList() {
  const [characterList, setCharacterList] = useState<Array<Characters>>([])
  const history = useHistory()

  return (
    <main>
      <h1>Liste des personnages</h1>
      {
        characterList.map((personage: Characters, i: number)=>(
          <p>{personage.name}</p>
        ))
      }
      <button onClick={()=> history.push('newcharacter')}>Créer un personnage</button>
    </main>
  );
}

export default CharactersList
