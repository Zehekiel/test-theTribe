import { ProviderApi } from './../constant/type'
import { API_URL_CHARACTER } from '../constant/env'

function postCharacter(
  name: string,
  health: number,
  attack: number,
  defense: number,
  magik: number,
  token: string
): Promise<ProviderApi> {
  const body = {
    name: name,
    health: health,
    attack: attack,
    defense: defense,
    magik: magik,
    token: token,
  }

  return fetch(`${API_URL_CHARACTER}/addcharacter`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((value: any) => {
      if (value.success) {
        return {
          success: true,
          message: value.message,
        }
      }
      return { success: false, message: value.message }
    })
    .catch((e) => {
      console.error('error postCharacter response.json', e)
      return { success: false, message: e }
    })
}

export default postCharacter
