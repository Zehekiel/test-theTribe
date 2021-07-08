import { API_URL_USER } from "../constant/env"
import { ProviderApi } from "../constant/type"


function subscription(nickname: string, password: string): Promise<ProviderApi>{
  const body = {nickname: nickname, password: password}
  console.log('body', body)
console.log('JSON.stringify(body)', JSON.stringify(body))
  return fetch(`${API_URL_USER}/adduser`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
    
  })
    .then(async (response) => ({
      success: true,
      message: await response.json(),
    }))
    .catch((e) => {
      console.error('error subscription response.json', e)
      return { success: false, message: e }
    })
}

export default subscription
