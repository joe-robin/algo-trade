import { BASE_URL, TOKEN } from '@/utils/const'
const headers = {
  'Content-Type': 'application/json',
  'access-token': TOKEN as string,
}

async function createOrder(body: CreateOrder) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    })
    const resBody = await response.json()
    return resBody
  } catch (exeception) {
    console.log(exeception)
  }
}

async function fetchOrders() {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: headers,
    })
    const resBody = await response.json()
    return resBody
  } catch (exeception) {
    console.log(exeception)
  }
}

export { fetchOrders, createOrder }
