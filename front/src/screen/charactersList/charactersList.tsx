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
    <main className='characterListContainer'>
      <h1>Liste des personnages</h1>
      <ul>
        {
          characterList.map((personage: Characters)=>(
            <CharacterCard oneCharacter={personage} key={personage.name}/>
          ))
        }
      </ul>
      <button onClick={()=> history.push('newcharacter')}>Créer un personnage</button>
    </main>
  )
}

export default CharactersList
