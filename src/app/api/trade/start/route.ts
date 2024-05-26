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
let count = 0

const mockFetch = async () => {
  return new Promise(resolve => {
    const random = Math.round(Math.random() * 10)
    console.log('random: ', random)

    setTimeout(() => {
      count++
      console.log(`called ${count} times`)
      resolve(`called ${count} times`)
    }, random * 1000)
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { interval, limit } = validator.parse(body)

    let shouldFetch = true
    setTimeout(() => (shouldFetch = false), limit * 60 * 1000) // Limit is in minutes 1 minute * 60 * 1000 => 1 minute worth of milliseconds

    const callFetch = async () => {
      if (!shouldFetch) return

      await mockFetch()
      setTimeout(callFetch, interval)
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
