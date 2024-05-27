import { BASE_URL, TOKEN } from '@/utils/const'
import clients from '@/json/client.json'
import { OrderClient } from './orde-client'

const headers = {
  'Content-Type': 'application/json',
  'access-token': TOKEN as string,
}

async function createOrder(body: CreateOrder) {
  try {
    const request = Object.values(clients).map(tkn => new OrderClient(tkn))
    const response = await Promise.all(request.map(order => order.post(body)))
    console.log(response, 'response')
  } catch (error) {
    console.log(error)
  }
}

async function fetchOrders() {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: headers,
    })
    const resBody: Order[] = await response.json()
    return resBody
  } catch (error) {
    console.log(error)
    return []
  }
}

export { fetchOrders, createOrder }
