import { Characters } from './../class/character'
import { ProviderApi } from '../constant/type'
import { API_URL_CHARACTER } from '../constant/env'

function updateCharactersAfterFight(
  winnerId: string,
  myOriginalCharacter: Characters,
  opponent: Characters,
): Promise<ProviderApi> {
  const myCharacter = { ... myOriginalCharacter }
  const originalOpponent = { ... opponent }

  const winnerIs = (): 'myCharacter' | 'opponent' => myCharacter._id === winnerId ? 'myCharacter' : 'opponent'

  if (winnerIs() === 'myCharacter'){
    //winner
    myCharacter.level = myCharacter.level + 1
    myCharacter.skillPoint = myCharacter.skillPoint + 1


    //looser
    if (originalOpponent.level > 1){
      originalOpponent.level = originalOpponent.level - 1
    }
    originalOpponent.lastFight = new Date().getTime()

  } else {
    //winner
    originalOpponent.level = originalOpponent.level + 1
    originalOpponent.skillPoint = originalOpponent.skillPoint + 1

    //looser
    if (myCharacter.level > 1){
      myCharacter.level = myCharacter.level - 1
    }
    myCharacter.lastFight = new Date().getTime()
  }

  const myCharacterBody = {
    id: myCharacter._id,
    skills: {
      level: myCharacter.level,
      skillPoint: myCharacter.skillPoint,
      lastFight: myCharacter.lastFight,
      historic: myCharacter.historic
    },
  }

  const opponentBody = {
    id: originalOpponent._id,
    skills: {
      level: originalOpponent.level,
      skillPoint: originalOpponent.skillPoint,
      lastFight: originalOpponent.lastFight,
      historic: originalOpponent.historic
    },
  }

  fetch(`${API_URL_CHARACTER}/setcharacter`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myCharacterBody),
  })
    .catch((e) => {
      console.error('error updateCharactersAfterFight myCharacter', e)
      return { success: false, message: e }
    })

  return fetch(`${API_URL_CHARACTER}/setcharacter`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opponentBody),
  })
    .then((response) => response.json())
    .then((value: any) => {
      if (value.success) {
        return {
          success: true,
          message:'Personnages modifiés',
        }
      }
      return { success: false, message: JSON.stringify(value.message) }
    })
    .catch((e) => {
      console.error('error updateCharactersAfterFight opponent', e)
      return { success: false, message: e }
    })
  
}

export default updateCharactersAfterFight
