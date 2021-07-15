import { ProviderApi } from '../../constant/type'
import { API_URL_CHARACTER } from '../../constant/env'

function deleteCharacter(
  id: string,
  token: string
): Promise<ProviderApi> {
  const body = {
    id: id,
    token: token
  }


  return fetch(`${API_URL_CHARACTER}/deletecharacter`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((value: ProviderApi) => {
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

export default deleteCharacter
