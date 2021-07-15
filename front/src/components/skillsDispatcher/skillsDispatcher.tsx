import React, { useState } from 'react'
import { Characters } from '../../class/character'
import Counter from '../counter/counter'
import './skillsDispatcher.css'

type SkillsDispatcherProps = {
  character :Characters,
  setSkills: Function,
  isNew: boolean
}

function SkillsDispatcher(props: SkillsDispatcherProps) {
  const { character, setSkills, isNew } = props
  const [ decrementRight, setDecrementRight ] = useState(
    {
      health: { able: isNew, counterClick: 0 },
      attack: { able: isNew, counterClick: 0 },
      defense: { able: isNew, counterClick: 0 },
      magik: { able: isNew, counterClick: 0 }
    }
  )

  function skillPointCost(point: number, increment: boolean): number {
    const compute = point / 5

    switch (increment) {
    case true:
      if (character.skillPoint - Math.ceil(compute) < 0) {
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
        character.skillPoint > 0 && skillPointCost(character[key], increment) !== 0
      ) {
        setSkills ('skillPoint', character.skillPoint - skillPointCost(character[key], increment))
        setSkills (key, character[key] + 1 )
        setDecrementRight((old) => ({ ...old, [key]: { able: true, counterClick: decrementRight[key].counterClick + 1 } }))
      }
      break

    case false:
      if (character.skillPoint >= 0 && decrementRight[key].counterClick > 0) {
        setSkills ('skillPoint', character.skillPoint + skillPointCost(character[key], increment))
        setSkills(key, character[key] - 1 )
        setDecrementRight((old) => ({ ...old, [key]: { able: true, counterClick: decrementRight[key].counterClick - 1 } }))
      }
      break
    }
  }

  function onClickCounterHealth(increment: boolean) {
    switch (increment) {
    case true:
      if (character.skillPoint > 0) {
        setSkills ('skillPoint', character.skillPoint - 1) ,
        setSkills('health', character.health + 1 )
        setDecrementRight((old) => ({ ...old, health: { able: true, counterClick: decrementRight.health.counterClick + 1 } }))
      }
      break

    case false:
      if (character.skillPoint >= 0 && decrementRight.health.counterClick > 0) {
        setSkills ('skillPoint', character.skillPoint + 1) ,
        setSkills('health', character.health - 1 )
        setDecrementRight((old) => ({ ...old, health: { able: true, counterClick: decrementRight.health.counterClick - 1 } }))
      }
      break
    }
  }


  return (
    <section className="newCharacterContainer">

      <div className="stat">
        <p className="statName">Santé </p>
        <Counter
          onPressPlus={() => onClickCounterHealth(true)}
          onPressMinus={() => onClickCounterHealth(false)}
          ableMinus={decrementRight.health.able}
          value={character.health}
        />
        <p className="statCost">1 PC</p>
      </div>

      <div className="stat">
        <p className="statName">Attaque </p>
        <Counter
          onPressPlus={() => onClickCounter('attack', true)}
          onPressMinus={() => onClickCounter('attack', false)}
          ableMinus={decrementRight.attack.able}
          value={character.attack}
        />
        <p className="statCost">
          {skillPointCost(character.attack, true)} PC
        </p>
      </div>

      <div className="stat">
        <p className="statName">Défense </p>
        <Counter
          onPressPlus={() => onClickCounter('defense', true)}
          onPressMinus={() => onClickCounter('defense', false)}
          ableMinus={decrementRight.defense.able}
          value={character.defense}
        />
        <p className="statCost">
          {skillPointCost(character.defense, true)} PC
        </p>
      </div>

      <div className="stat">
        <p className="statName">Magie </p>
        <Counter
          onPressPlus={() => onClickCounter('magik', true)}
          onPressMinus={() => onClickCounter('magik', false)}
          ableMinus={decrementRight.magik.able}
          value={character.magik}
        />
        <p className="statCost">
          {skillPointCost(character.magik, true)} PC
        </p>
      </div>
    </section>
  )
}

export default SkillsDispatcher
