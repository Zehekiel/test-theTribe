import React from 'react'
import { useAppSelector } from '../../hook'
import { useHistory } from 'react-router'
import { Characters } from '../../class/character'
import './characterList.css'
import CharacterCard from '../../components/characterCard/characterCard'

function CharactersList() {
  const characterList = useAppSelector((state) => state.characterList.value)
  const history = useHistory()

  return (
    <main className="characterListContainer">
      <h1 id='characterListTitle'>Liste des personnages</h1>
      <ul id='list'>
        {characterList.map((personage: Characters) => (
          <CharacterCard 
            oneCharacter={personage} 
            key={personage._id}
            selected={false}
            onClickCard={()=> history.push(`/character/${personage._id}`)}
          />
        ))}
      </ul>
      {characterList.length > 0 &&
        <button onClick={() => history.push('/findopponent')} id='characterListCreateButton'>
          Combattre!
        </button>
      }
      <button onClick={() => history.push('/character/0')} id='characterListCreateButton'>
        Créer un personnage
      </button>
    </main>
  )
}

export default CharactersList
