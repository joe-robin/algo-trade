import clienJSON from '@/json/client.json'
import { InvalidUser } from '@/lib/error'
import { writeFileSync } from 'fs'
import { z } from 'zod'

export async function GET(req: Request) {
  try {
    return new Response(JSON.stringify(clienJSON))
  } catch (error) {
    console.log(error)
    return new Response('Something went wrong', { status: 500 })
  }
}
const validator = z.object({
  clientId: z.string(),
  token: z.string(),
})

const validateUser = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${process.env.DHAN_URL}/fundlimit`, {
      headers: { 'Content-Type': 'application/json', 'access-token': token },
    })
    if (!response.ok) {
      throw new InvalidUser()
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function POST(req: Request) {
  try {
    const reqBody = await req.json()
    const { clientId, token } = validator.parse(reqBody)
    await validateUser(clientId, token)
    const newClientList: Record<string, string> = { ...clienJSON }
    newClientList[clientId] = token
    writeFileSync('./src/json/client.json', JSON.stringify(newClientList))
    /**@todo give better response message */
    return new Response('Ok')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    } else if (error instanceof InvalidUser) {
      return new Response('Invalid Token', { status: 422 })
    }
    return new Response('Something went wrong', { status: 500 })
  }
}
