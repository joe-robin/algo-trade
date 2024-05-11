import { NextRequest } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    return Response.json({ message: 'Server Running' })
  } catch (error) {
    return new Response('error', { status: 500 })
  }
}
