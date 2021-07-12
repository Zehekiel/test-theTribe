import React from 'react'
import { useParams } from 'react-router-dom'
import { Characters } from '../../class/character'
import { useAppSelector } from '../../hook'

function Fight (){
  const params: {id: string} = useParams()
  const myCharacterList : Array<Characters> = useAppSelector((state) => state.characterList.value)
  const opponent : Characters = useAppSelector((state) => state.opponent.value)
  const findMyCharacter = myCharacterList.filter((character: Characters)=> character._id === params.id)
  const myCharacter = findMyCharacter[0]
  
  console.log('Fight ~ myCharacter', myCharacter)
  console.log('Fight ~ opponent', opponent)

  return(
    <main>
      <h1>COMBAT!!!</h1>
    </main>
  )
}

export default Fight
