import { BASE_URL } from '@/utils/const'

/**@todo figure out better structure for the class files */
export class OrderClient {
  private readonly url = `${BASE_URL}/orders`
  token: string

  constructor(token: string) {
    this.token = token
  }

  async post(reqBody: CreateOrder) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
          'access-token': this.token,
        },
      })
      const resBody = await response.json()
      console.log(resBody, 'resBody')
      return resBody
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
