import React from 'react'
import { Characters } from '../../class/character'
import { GiSwordman } from 'react-icons/gi'
import { RiZzzFill } from 'react-icons/ri'

import './characterCard.css'

function CharacterCard(props: { 
  oneCharacter: Characters,
  selected: boolean,
  onClickCard: Function
}) {
  const actualDate = new Date()
  const oneHour = 3600000 // millisecond
  const {
    name,
    skillPoint,
    health,
    attack,
    defense,
    magik,
    level,
    lastFight,
  } = props.oneCharacter
  const { selected, onClickCard } = props

  const available = (): boolean => {
    if (actualDate.getTime() > lastFight + oneHour) {
      return true
    } else {
      return false
    }
  }

  return (
    <li className="characterCard" style={{ boxShadow: selected? '0px 0px 2px 4px lightgreen' : 'unset' }}>
      <article onClick={()=> onClickCard()}>
        <section className="characterIdentity" id="identity">
          <h2 id="characterName">{name}</h2>
          <p className="characterStat">
            LVL <strong>{level}</strong>{' '}
          </p>
          <p className="characterStat">PC {skillPoint}</p>
          {available() ? (
            <GiSwordman color="lightgreen" id="icon" size="2em" />
          ) : (
            <RiZzzFill color="red" id="icon" size="2em" />
          )}
        </section>

        <section className="characterIdentity">
          <p className="characterStat">
            PV <strong>{health}</strong>
          </p>
          <p className="characterStat">
            PM <strong>{magik}</strong>
          </p>
        </section>

        <section className="characterIdentity">
          <p className="characterStat">
            ATT <strong>{attack}</strong>
          </p>
          <p className="characterStat">
            DEF <strong>{defense}</strong>
          </p>
        </section>
      </article>
    </li>
  )
}

export default CharacterCard
