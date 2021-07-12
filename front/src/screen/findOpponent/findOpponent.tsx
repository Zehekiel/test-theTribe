import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import getOpponentList from '../../API/getOpponentList'
import { Characters } from '../../class/character'
import CharacterCard from '../../components/characterCard/characterCard'
import { addKeyAndValue, useAppDispatch, useAppSelector } from '../../hook'
import { saveOpponent } from '../../toolkit/opponent'
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
          if(response.success){
            const newOpponent : Characters = JSON.parse(response.message)
            if (newOpponent._id !== undefined){
              setOpponent(newOpponent)
              dispatch(saveOpponent(newOpponent))
            } else {
              setErrorMessage('il n\'y a pas d\'adversaire disponible')  
            }
          } else {
            setErrorMessage('Il y a eu un problème lors de la récupération de vos adversaires')  
          }
        })
    } else {
      setCharacterList(addKeyAndValue(myCharacterList, 'selected', false))
    }
  }, [ characterIdChoosed ])

  function onClickMyCharacter (index: number){
    const resetSelect = characterList.map((ch: Characters)=>{
      ch.selected = false
      return ch
    })
    setCharacterList(resetSelect)
    setcharacterIdChoosed(characterList[index]._id)
    setcharacterChoosed(characterList[index])
    characterList[index].selected = !characterList[index].selected
    setCharacterList(characterList)
  }

  return(
    <>
      <h1>Trouver un combattant</h1>
      <div className='findOpponentContainer'>
        <article className='mainColumn'>
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
        </article>

        <article className='separator'>
          <h2 id='versus' >VS</h2>
        </article>

        <article className='mainColumn'>
          {opponent.name !== '' ?
            <>
              <CharacterCard
                oneCharacter={opponent}
                key={opponent._id}
                selected={opponent.selected}
                onClickCard={() => setcharacterIdChoosed(opponent._id)}
              />
              <button
                onClick={() => history.push(`/fight/${characterIdChoosed}`)}
              >
                Lancer le combat
              </button>
            </>
            :
            <p>{errorMessage}</p>
          }
        </article>

      </div>
    </>
  )
}

export default FindOpponent
