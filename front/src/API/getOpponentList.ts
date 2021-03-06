import { Characters } from '../class/character'
import { API_URL_OPPONENT } from '../constant/env'
import { ProviderApi } from '../constant/type'

function getOpponentList(currentCharacter: Characters, currentCharacterList: Array<Characters>): Promise<ProviderApi> {
  const idUsed: Array<string> = currentCharacterList.reduce((acc, cur)=>{ 
    acc.push(cur._id) 
    return acc
  }, new Array() )

  const body = { 
    currentCharacter: currentCharacter,
    currentList: idUsed
  }

  return fetch(`${API_URL_OPPONENT}/getopponentlist`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(async (value: any) => {
      const opponent = await value
      if (opponent.success) {
        return {
          success: true,
          message: opponent.message,
        }
      }
      return { success: false, message: opponent.message }
    })
    .catch((e) => {
      console.error('error postCharacter response.json', e)
      return { success: false, message: e }
    })
}

export default getOpponentList
