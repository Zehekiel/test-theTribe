import { API_URL_USER } from '../../constant/env'
import { ProviderApi } from '../../constant/type'

function getCharacterList(token: string): Promise<ProviderApi> {
  return fetch(`${API_URL_USER}/getcharacterlist`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(token),
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

export default getCharacterList
