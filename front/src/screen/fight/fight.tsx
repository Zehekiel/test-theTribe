import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RiSwordFill } from 'react-icons/ri'
import updateCharactersAfterFight from '../../API/updateCharactersAfterFight'
import { Characters } from '../../class/character'
import { FightReport } from '../../class/fightReport'
import CharacterCard from '../../components/characterCard/characterCard'
import ErrorText from '../../components/errorText/errorText'
import Modal from '../../components/modal/modal'
import { useAppDispatch, useAppSelector } from '../../hook'
import { setList } from '../../toolkit/userCharacterList/userCharacterList'
import '../findOpponent/findOpponent.css'
import './fight.css'

function Fight (){
  const history = useHistory()
  const dispatch = useAppDispatch()

  const myCharacterStore : Characters = useAppSelector((state) => state.myCharacter.value)
  const opponentStore : Characters = useAppSelector((state) => state.opponent.value)

  const [ errorMessage, setErrorMessage ] = useState('')
  const [ myCharacter, setMyCharacter ] = useState<Characters>(new Characters())
  const [ opponent, setOpponent ] = useState<Characters>(new Characters())
  const [ reportModal, setReportModal ] = useState(false)
  const [ reportData, setReportData ] = useState<FightReport>(new FightReport())
  const [ winner, setWinner ] = useState({ id:'', name: '' })

  const [ turn, setTurn ] = useState(1)

  useEffect(() => {
    setMyCharacter({ ...myCharacterStore })
    setOpponent({ ...opponentStore })
  }, [])

  function launchDice(point: number): number{
    const diceValue = Math.floor(Math.random() * point)
    return diceValue
  }

  function oneAttak (attacker: Characters, defender: Characters): {att: number, total: number}{
    const attackerAttackValue = launchDice(attacker.attack)
    if ( attackerAttackValue <= defender.defense){
      return { att: 0, total: 0 }
    } else {
      const attakValue = attackerAttackValue - defender.defense

      if(attakValue === attacker.magik){
        return { att: attakValue, total: attakValue + attacker.magik }
      } else {
        return { att: attakValue, total: attakValue }
      }
    }
  }

  function oneTurn() {
    let report = new FightReport()
    report.turnCount = turn
    setTurn(turn + 1)

    const MyCharacterAttak = oneAttak(myCharacter, opponent)
    const opponentHealthLost = opponent.health - MyCharacterAttak.total
    const opponentAttak = oneAttak(opponent, myCharacter)
    const myCharacterHealthLost = myCharacter.health - opponentAttak.total
    setMyCharacter((state) => ({ ... state, health: myCharacterHealthLost }))
    setOpponent((state) => ({ ... state, health: opponentHealthLost }))

    if(opponent.health <= 0){
      report.finish = true
      report.winner = myCharacter.name
      report.attacker.attackDid = MyCharacterAttak.att
      report.defender.healthLost = MyCharacterAttak.total
      setMyCharacter((state) => ({ ... state, level: state.level + 1 }))
      setMyCharacter((state) => ({ ... state, health: myCharacterStore.health }))
      setMyCharacter((state) => ({ ... state, skillPoint: state.skillPoint + 1 }))
      setMyCharacter((state) => ({ ... state, historic: [ 
        ...state.historic, { 
          turnCount: turn,
          isWinner: true,
          opponentName: opponent.name,
          date: new Date()
        }
      ] }))
      setOpponent((state) => ({ ... state, historic: [ 
        ...state.historic, { 
          turnCount: turn,
          isWinner: false,
          opponentName: myCharacter.name,
          date: new Date()
        }
      ] }))

      setWinner({ id: myCharacter._id, name: myCharacter.name })
      setReportModal(true)
      return
    } else {
      report.finish = false
      report.attacker.attackDid = MyCharacterAttak.att
      report.defender.healthLost = MyCharacterAttak.total
    }

    if(myCharacter.health <= 0){        
      report.finish = true
      report.winner = opponent.name
      report.defender.attackDid = opponentAttak.att
      report.attacker.healthLost = opponentAttak.total
      if(myCharacter.level > 1){
        setMyCharacter((state) => ({ ... state, level: state.level - 1 }))
      }
      setMyCharacter((state) => ({ ... state, health: myCharacterStore.health }))
      setMyCharacter((state) => ({ ... state, lastFight: new Date().getTime() }))
      setWinner({ id: opponent._id, name: opponent.name })
      setMyCharacter((state) => ({ ... state, historic: [ 
        ...state.historic, { 
          turnCount: turn,
          isWinner: false,
          opponentName: opponent.name,
          date: new Date()
        }
      ] }))
      setOpponent((state) => ({ ... state, historic: [ 
        ...state.historic, { 
          turnCount: turn,
          isWinner: true,
          opponentName: myCharacter.name,
          date: new Date()
        }
      ] }))
      setReportModal(true)
      return
    } else {
      report.finish = false
      report.defender.attackDid = opponentAttak.att
      report.attacker.healthLost = opponentAttak.total
    }
    setReportModal(true)
    setReportData(report)
  }

  function OnClickFightEnd (){
    updateCharactersAfterFight(winner.id, myCharacter, opponent)
      .then(async (response)=>{
        if (response.success){
          dispatch(setList(myCharacter))
          history.push('/findopponent')
        } else {
          setErrorMessage(response.message)
        }
      })
  }
  return(
    <main className='mainFigthContainer'>
      <h1>COMBAT!!!</h1>
      <h2>Tour {turn}</h2>

      <Modal
        isShowing={reportModal}
        hide={()=> setReportModal(!reportModal)}
        title={`Rapport du tour ${reportData.turnCount}`}
      >
        <>
          <p>{reportData.finish}</p>
          <article className='reportbyside'>
            <section className='side'>
              <h4>{myCharacter.name}</h4>
              <p>Dégat fait: {reportData.attacker.attackDid}</p>
              <p>Vie perdu: {reportData.attacker.healthLost}</p>
            </section>
            <section className='side'>
              <h4>{opponent.name}</h4>
              <p>Dégat fait: {reportData.defender.attackDid}</p>
              <p>Vie perdu: {reportData.defender.healthLost}</p>
            </section>
          </article>
          {winner.id === '' ?
            <button onClick={()=> oneTurn()} >
              C'est repartie pour un tour
            </button>
            :
            <>
              <h2 className='winner'>Le gagnant est <strong>{winner.name}</strong></h2>
              <button onClick={() => OnClickFightEnd()}>
                Choisir un nouveau combattant
              </button>
            </>
          }
        </>
      </Modal>

      <div className='figthContainer'>
        <article className='mainColumn'>
          <ul>
            <CharacterCard 
              oneCharacter={myCharacter} 
              key={myCharacter._id}
              selected={false}
              onClickCard={()=> null}
            />
          </ul>
        </article>

        <article className='separator'>
          <RiSwordFill color="lightgrey"  size="3em"/>
        </article>

        <article className='mainColumn'>
          <CharacterCard
            oneCharacter={opponent}
            key={opponent._id}
            selected={false}
            onClickCard={() => null}
          />
        </article>
      </div>

      <ErrorText text={errorMessage} />
      {winner.id === '' ? 
        <button onClick={()=> oneTurn()} > Commencer </button>
        :
        <button onClick={()=> OnClickFightEnd()} > Terminer </button>
      }
    </main>
  )
}

export default Fight
