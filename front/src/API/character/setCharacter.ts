import { ProviderApi, SettingCharacters } from '../../constant/type'
import { API_URL_CHARACTER } from '../../constant/env'

function setCharacter(
  id: string,
  skills: SettingCharacters,
  token: string
): Promise<ProviderApi> {
  const body = {
    id: id,
    skills: skills,
    token: token,
  }

  return fetch(`${API_URL_CHARACTER}/setcharacter`, {
    method: 'PATCH',
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

export default setCharacter
