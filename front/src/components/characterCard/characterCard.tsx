import React from 'react'
import { Characters } from '../../class/character'
import { GoPrimitiveDot } from 'react-icons/go'
import {
  GiDeathSkull,
  GiHealthNormal,
  GiPiercingSword,
  GiShield,
  GiTrophyCup
} from 'react-icons/gi'
import { ImMagicWand } from 'react-icons/im'

import './characterCard.css'
import { FinalReport } from '../../class/finalReport'

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
    historic
  } = props.oneCharacter
  const { selected, onClickCard } = props

  const available = (): boolean => {
    if (actualDate.getTime() > lastFight + oneHour) {
      return true
    } else {
      return false
    }
  }

  const { victory, lost }: { victory: number, lost: number } = historic.reduce(
    (accumulator: { victory: number, lost: number }, current: FinalReport)=>{
      if (current.isWinner){
        accumulator.victory++
      } else {
        accumulator.lost++
      }
      return accumulator
    }, { victory: 0, lost: 0 })

  return (
    <li 
      className="characterCard" 
      style={{ boxShadow: selected ? '0px 0px 2px 4px lightgreen' : '3px 3px black' }}
      onClick={()=> onClickCard()}
      data-testid='characterCard'
    >
      <section className="characterIdentity" id="identity">
        <h2 id="characterName">{name}</h2>
        <p className="characterStat">
            LVL <strong>{level}</strong>{' '}
        </p>
        <GoPrimitiveDot 
          color={available() ? 'green' : 'red'} 
          className="icon" 
          size="2em"
          data-testid='primitiveDot'
        />
      </section>

      <section className="characterIdentity">
        <p className="characterStat">
          <GiHealthNormal color="red" size="1em" /> <strong>{health}</strong>
        </p>
        <p className="characterStat">
          <ImMagicWand color="#1489ff" size="1em" /> <strong>{magik}</strong>
        </p>
      </section>

      <section className="characterIdentity" id="identity">
        <p className="characterStat">
          <GiPiercingSword color="white" size="1.1em" /> <strong>{attack}</strong>
        </p>
        <p className="characterStat">
          <GiShield color="grey" size="1.1em" /> <strong>{defense}</strong>
        </p>
      </section>
      <section className="characterIdentity">
        <p className="characterStat">PC {skillPoint}</p>
        <p className="characterStat">
          <strong data-testid='winCount'>{victory}</strong> <GiTrophyCup color="yellow" size="1em" /> 
          / 
          <strong data-testid='losCount'> {lost}</strong><GiDeathSkull color="white" size="1em" /> 
        </p>
      </section>

    </li>
  )
}

export default CharacterCard
