import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import getOpponentList from '../../API/getOpponentList'
import { Characters } from '../../class/character'
import CharacterCard from '../../components/characterCard/characterCard'
import { addKeyAndValue, useAppDispatch, useAppSelector } from '../../hook'
import { saveOpponent } from '../../toolkit/opponent/opponent'
import { saveMyCharacter } from '../../toolkit/userCharacter/userCharacter'
import './findOpponent.css'


function FindOpponent(){
  const [ characterList, setCharacterList ] = useState<Array<Characters>>([])
  const myCharacterList : Array<Characters> = useAppSelector((state) => state.characterList.value)
  const [ opponent, setOpponent ] = useState<Characters>(new Characters())
  const [ errorMessage, setErrorMessage ] = useState(' <- Choissisez votre combattant')
  const [ characterIdChoosed, setcharacterIdChoosed ] = useState('')
  const [ characterChoosed, setcharacterChoosed ] = useState<Characters>(new Characters())
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    if(characterIdChoosed !== ''){
      getOpponentList(characterChoosed, characterList )
        .then(async(response)=>{
          const answer = await response
          if(answer.success){
            const newOpponent : Characters = JSON.parse(answer.message)
            setOpponent(newOpponent)
            dispatch(saveOpponent(newOpponent))
          } else {
            setErrorMessage(answer.message)  
          }
        })
    } else {
      const characterListAvailable = myCharacterList.filter((char: Characters)=> char.lastFight < new Date().getTime() - 3600000)
      setCharacterList(addKeyAndValue(characterListAvailable, 'selected', false))
    }
    return () => {
      setOpponent(new Characters())
    }
  }, [ characterIdChoosed, myCharacterList ])

  function onClickMyCharacter (index: number){
    const resetSelect = characterList.map((ch: Characters)=>{
      ch.selected = false
      return ch
    })
    setCharacterList(resetSelect)
    setcharacterIdChoosed(characterList[index]._id)
    setcharacterChoosed(characterList[index])
    characterList[index].selected = true
    setCharacterList(characterList)
  }

  function onClickLaunchFight(){
    dispatch(saveMyCharacter(characterChoosed))
    history.push(`/fight/${characterIdChoosed}`)
  }

  return(
    <main>
      <h1>Trouver un combattant</h1>
      <article className='findOpponentContainer'>
        <section className='mainColumn'>
          <ul>
            {characterList.map((personage: Characters, i: number) => (
              <CharacterCard 
                oneCharacter={personage} 
                key={personage._id}
                selected={personage.selected}
                onClickCard={()=> onClickMyCharacter(i)}
              />
            ))}
          </ul>
        </section>

        <section className='separator'>
          <h2 id='versus' >VS</h2>
        </section>

        <section className='mainColumn'>
          {opponent.name !== '' ?
            <>
              <CharacterCard
                oneCharacter={opponent}
                key={opponent._id}
                selected={opponent.selected}
                onClickCard={() => null}
              />
              <button
                onClick={() => onClickLaunchFight()}
              >
                Lancer le combat
              </button>
            </>
            :
            <p>{errorMessage}</p>
          }
        </section>

      </article>
    </main>
  )
}

export default FindOpponent
