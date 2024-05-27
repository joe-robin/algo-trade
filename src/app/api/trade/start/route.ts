import { createOrder, fetchOrders } from '@/lib/core'
import { MAX_INTERVAL, MAX_LIMIT, MIN_INTERVAL } from '@/utils/const'
import { NextRequest } from 'next/server'
import { z } from 'zod'

/**
 * @todo Allow to modify the thing (write get and put requests)
 */

const validator = z.object({
  interval: z.number().min(MIN_INTERVAL).max(MAX_INTERVAL),
  limit: z.number().max(MAX_LIMIT),
})
let ordersCount = 0

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { interval, limit } = validator.parse(body)

    ordersCount = (await fetchOrders()).length

    let shouldFetch = true
    setTimeout(() => (shouldFetch = false), limit * 60 * 1000) // Limit is in minutes 1 minute * 60 * 1000 => 1 minute worth of milliseconds

    const callFetch = async () => {
      if (!shouldFetch) return
      const callback = () => setTimeout(callFetch, interval) // aka continue

      const newOrders = await fetchOrders()
      const newOrdersCount = newOrders.length

      if (!(newOrdersCount > ordersCount)) callback() // If the newOrdersCount is not greater than orders count  continue
      // Only allow for INTRADAY Order
      if (!(newOrders[0].productType === 'INTRADAY ')) {
        ordersCount = newOrdersCount
        callback()
      }

      if (newOrders[0].orderStatus === 'PENDING') {
      }

      const {
        afterMarketOrder,
        exchangeSegment,
        orderType,
        productType,
        quantity,
        securityId,
        tradingSymbol,
        transactionType,
        validity,
        orderId,
        orderStatus,
      } = newOrders[0]
      const orderObj: CreateOrder = {
        exchangeSegment,
        transactionType,
        tradingSymbol,
        securityId,
        quantity,
        orderType,
        productType,
        validity,
        afterMarketOrder,
        amoTime: 'OPEN' /**@todo amdo time is not in the list  */,
      }
      await createOrder(orderObj)
      ordersCount = newOrders.length
      callback()
    }

    callFetch()

    return new Response('Started')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response('Unknow Error', { status: 500 })
  }
}
