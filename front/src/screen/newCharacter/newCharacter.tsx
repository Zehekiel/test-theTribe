import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import postCharacter from '../../API/postCharacter'
import { Characters } from '../../class/character'
import Counter from '../../components/counter/counter'
import ErrorText from '../../components/errorText/errorText'
import { useAppDispatch, useAppSelector } from '../../hook'
import { addCharacter } from '../../toolkit/userCharacterList'
import './newCharacter.css'

function NewCharacter() {
  const [newCharacter, setNewCharacter] = useState<Characters>(
    new Characters()
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [showSaveButton, setShowSaveButton] = useState(false)

  const history = useHistory()
  const token = useAppSelector((state) => state.userToken.value)
  const dispatch = useAppDispatch()

  function skillPointCost(point: number, increment: boolean): number {
    const compute = point / 5

    switch (increment) {
    case true:
      if (newCharacter.skillPoint - Math.ceil(compute) < 0) {
        return 0
      } else {
        if (point === 0) {
          return 1
        }
        return Math.ceil(compute)
      }

    case false:
      if (point === 0) {
        return 1
      }
      return Math.ceil(compute)
    }
  }

  function onClickCounter(
    key: 'attack' | 'defense' | 'magik',
    increment: boolean
  ) {
    switch (increment) {
    case true:
      if (
        newCharacter.skillPoint > 0 &&
          skillPointCost(newCharacter[key], increment) !== 0
      ) {
        if (newCharacter.skillPoint === 1) {
          setShowSaveButton(true)
        } else {
          setShowSaveButton(false)
        }
        setNewCharacter((old) => ({
          ...old,
          skillPoint: old.skillPoint - skillPointCost(old[key], increment),
        }))
        setNewCharacter((old) => ({ ...old, [key]: old[key] + 1 }))
      } else {
        setShowSaveButton(true)
      }
      break

    case false:
      if (newCharacter.skillPoint >= 0) {
        setShowSaveButton(false)
        setNewCharacter((old) => ({
          ...old,
          skillPoint: old.skillPoint + skillPointCost(old[key], increment),
        }))
        setNewCharacter((old) => ({ ...old, [key]: old[key] - 1 }))
      } else {
        setShowSaveButton(true)
      }
      break
    }
  }

  function onClickCounterHealth(increment: boolean) {
    switch (increment) {
    case true:
      if (newCharacter.skillPoint > 0) {
        if (newCharacter.skillPoint === 1) {
          setShowSaveButton(true)
        } else {
          setShowSaveButton(false)
        }
        setNewCharacter((old) => ({
          ...old,
          skillPoint: old.skillPoint - 1,
        }))
        setNewCharacter((old) => ({ ...old, health: old.health + 1 }))
      } else {
        setShowSaveButton(true)
      }
      break

    case false:
      if (newCharacter.skillPoint >= 0) {
        setShowSaveButton(false)
        setNewCharacter((old) => ({
          ...old,
          skillPoint: old.skillPoint + 1,
        }))
        setNewCharacter((old) => ({ ...old, health: old.health - 1 }))
      }
      break
    }
  }

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
    if (isFormIsValid()) {
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

  return (
    <main className="newCharacterContainer">
      <h1>Personnaliser un nouveau personnage</h1>
      <p>
        Vous avez{' '}
        <strong>
          {newCharacter.skillPoint}{' '}
          {newCharacter.skillPoint === 0 ? 'point' : 'points'} de compétence
          (PC)
        </strong>{' '}
        à répartir entre les différentes statistiques{' '}
      </p>
      <input
        type="text"
        placeholder="Nom du personnage"
        value={newCharacter.name}
        onChange={(e) =>
          setNewCharacter((old) => ({ ...old, name: e.target.value }))
        }
        className="logInput"
      />

      <div className="stat">
        <p className="statName">Santé </p>
        <Counter
          onPressPlus={() => onClickCounterHealth(true)}
          onPressMinus={() => onClickCounterHealth(false)}
          value={newCharacter.health}
        />
        <p className="statCost">1 PC</p>
      </div>

      <div className="stat">
        <p className="statName">Attaque </p>
        <Counter
          onPressPlus={() => onClickCounter('attack', true)}
          onPressMinus={() => onClickCounter('attack', false)}
          value={newCharacter.attack}
        />
        <p className="statCost">
          {skillPointCost(newCharacter.attack, true)} PC
        </p>
      </div>

      <div className="stat">
        <p className="statName">Défense </p>
        <Counter
          onPressPlus={() => onClickCounter('defense', true)}
          onPressMinus={() => onClickCounter('defense', false)}
          value={newCharacter.defense}
        />
        <p className="statCost">
          {skillPointCost(newCharacter.defense, true)} PC
        </p>
      </div>

      <div className="stat">
        <p className="statName">Magie </p>
        <Counter
          onPressPlus={() => onClickCounter('magik', true)}
          onPressMinus={() => onClickCounter('magik', false)}
          value={newCharacter.magik}
        />
        <p className="statCost">
          {skillPointCost(newCharacter.magik, true)} PC
        </p>
      </div>

      <ErrorText text={errorMessage} />
      {showSaveButton && (
        <button className="saveButton" onClick={() => saveNewCharacter()}>
          Sauvegarder
        </button>
      )}
    </main>
  )
}

export default NewCharacter
