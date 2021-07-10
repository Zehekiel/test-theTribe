import { ProviderApi } from './../constant/type'
import { API_URL_USER } from '../constant/env'

function subscription(
  nickname: string,
  password: string
): Promise<ProviderApi> {
  const body = { nickname: nickname, password: password }

  return fetch(`${API_URL_USER}/adduser`, {
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
      console.error('error subscription response.json', e)
      return { success: false, message: e }
    })
}

export default subscription
