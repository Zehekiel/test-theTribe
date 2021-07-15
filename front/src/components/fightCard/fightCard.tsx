import React from 'react'
import {
  GiDeathSkull,
  GiTrophyCup
} from 'react-icons/gi'
import { GoSync } from 'react-icons/go'
import { RiSwordFill } from 'react-icons/ri'

import './fightCard.css'
import { FinalReport } from '../../class/finalReport'


function FightCard(props: { 
  oneReport: FinalReport,
}) {
  const {
    turnCount,
    isWinner,
    opponentName,
    date
  } = props.oneReport


  return (
    <section 
      className="fightCard" 
    >
      <div className="divFightCard">
        {isWinner ? 
          <GiTrophyCup color="yellow" size="3.5em" className='iconVictory' />
          :
          <GiDeathSkull color="white" size="3.5em" className='iconVictory' /> 
        }
      </div>

      <div className="divFightCard">
        <p className="fightStat">
          <GoSync color="white" size="1.2em" /> {turnCount}
        </p>
        <p className="fightStat">
          <RiSwordFill  color="white" size="1.2em" /> {opponentName}
        </p>
      </div>

      <div className="divFightCard">
        <p className="fightStat">
          {new Date(date).toLocaleDateString()} à {new Date(date).toLocaleTimeString()}
        </p>
      </div>

    </section>
  )
}

export default FightCard
