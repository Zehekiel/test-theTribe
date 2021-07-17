import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import deleteCharacter from '../../API/character/deleteCharacter'
import postCharacter from '../../API/character/postCharacter'
import setCharacter from '../../API/character/setCharacter'
import { Characters } from '../../class/character'
import { FinalReport } from '../../class/finalReport'
import ErrorText from '../../components/errorText/errorText'
import FightCard from '../../components/fightCard/fightCard'
import SkillsDispatcher from '../../components/skillsDispatcher/skillsDispatcher'
import { SettingCharacters } from '../../constant/type'
import { useAppDispatch, useAppSelector } from '../../hook'
import { addCharacter, deleteOneCharacter, setList } from '../../toolkit/userCharacterList/userCharacterList'
import './character.css'

function Character() {
  const [ newCharacter, setNewCharacter ] = useState<Characters>(new Characters())
  const [ originalCharacter, setOriginalCharacter ] = useState<Characters>(new Characters()) 

  const [ errorMessage, setErrorMessage ] = useState('')

  const  params: {id: string, name: string} = useParams()
  const characterId = params.id
  const isNewCharacter: boolean = characterId === '0'

  const history = useHistory()
  const token = useAppSelector((state) => state.userToken.value)
  const characterList = useAppSelector((state) => state.characterList.value)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(isNewCharacter){
      setNewCharacter(new Characters())
    } else {
      const findCharacter: Array<Characters> = characterList.filter((character: Characters) => {
        if(character._id.localeCompare(characterId) === 0){
          return character
        }
      })
      setNewCharacter(findCharacter[0])
      setOriginalCharacter(findCharacter[0])
    }
  }, [ params ])

  function isFormIsValid(): boolean {
    if (newCharacter.skillPoint !== 0) {
      setErrorMessage('Il reste des points de compétence à attribuer')
      return false
    }

    if (newCharacter.name.length === 0) {
      setErrorMessage('Il manque le nom')
      return false
    }

    setErrorMessage('')
    return true
  }

  async function saveNewCharacter() {
    if (isFormIsValid() && characterList.length < 10) {
      await postCharacter(
        newCharacter.name,
        newCharacter.health,
        newCharacter.attack,
        newCharacter.defense,
        newCharacter.magik,
        token
      ).then((data) => {
        if (data.success) {
          const newCharacter = JSON.parse(data.message)
          setErrorMessage('')
          dispatch(addCharacter(newCharacter))
          history.push('/characterlist')
        } else {
          setErrorMessage(data.message)
        }
      })
    }
  }

  async function onClickSetCharacter() {
    if (isFormIsValid() && !Object.is(newCharacter, originalCharacter)) {
      let body : SettingCharacters = {}

      if (newCharacter.attack !== originalCharacter.attack){
        body['attack'] = newCharacter.attack
      }
      if (newCharacter.defense !== originalCharacter.defense){
        body['defense'] = newCharacter.defense
      }
      if (newCharacter.health !== originalCharacter.health){
        body['health'] = newCharacter.health
      }
      if (newCharacter.magik !== originalCharacter.magik){
        body['magik'] = newCharacter.magik
      }

      await setCharacter(
        originalCharacter._id,
        body,
        token
      ).then((data) => {
        if (data.success) {
          setErrorMessage('')
          dispatch(setList(newCharacter))
          history.push('/characterlist')
        } else {
          setErrorMessage(JSON.parse(data.message))
        }
      })
    }
  }

  async function onClickDeleteCharacter (){
    await deleteCharacter(characterId, token)
      .then((isDelete)=> {
        if (isDelete.success){
          setErrorMessage('')
          dispatch(deleteOneCharacter(newCharacter._id))
          history.push('/characterlist')
        } else {
          setErrorMessage(isDelete.message)
        }
      })
  }

  return (
    <main className="newCharacterContainer">
      <h1>{isNewCharacter ? 'Personnaliser un nouveau personnage' : 'Modifier ce personnage'}</h1>
      <input
        type="text"
        placeholder="Nom du personnage"
        value={newCharacter.name}
        onChange={(e) =>
          setNewCharacter ( (old) => ({ ...old, ['name']: e.target.value }) )
        }
        id="inputName"
        disabled={!isNewCharacter}
      />
      <h2>
        <strong>
          {newCharacter.skillPoint}{' '}
          {newCharacter.skillPoint === 0 ? 'point' : 'points'} de compétence
          (PC)
        </strong>{' '}
      </h2>

      <SkillsDispatcher 
        character={newCharacter}
        setSkills= {(key: 'attack' | 'defense' | 'magik' | 'health', value: number ) => setNewCharacter ((old) => ({ ...old, [key]: value }))
        }
        isNew={isNewCharacter}
      />

      <ErrorText text={errorMessage} />

      <button className="saveButton" onClick={() => isNewCharacter ? saveNewCharacter() : onClickSetCharacter()}>
        {isNewCharacter ? 'Sauvegarder' : 'Sauvegarder les modifications'}
      </button>

      {!isNewCharacter &&
        <button className="deleteButton" onClick={() => onClickDeleteCharacter()}>
          Supprimer ce personnage
        </button>
      }

      {
        newCharacter.historic.length > 0 &&
        <article className='fightreportlistcontainer'>
          <h1>Historique des combats</h1>
          <section className='fightreportlist' >
            {newCharacter.historic.map((report: FinalReport, i: number)=>(
              <FightCard oneReport={report} key={`${report.opponentName}${i}`} />
            ))}
          </section>
        </article>
      }

    </main>
  )
}

export default Character
