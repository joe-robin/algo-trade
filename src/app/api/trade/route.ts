// import { getDb } from '@/lib/db'
import { getDb } from '@/lib/mongodb'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const db = await getDb()
    const body = await req.json()
    const res = await db.collection('exec').insertOne(body)
    return Response.json(res)
  } catch (error) {
    return new Response('error', { status: 500 })
  }
}
