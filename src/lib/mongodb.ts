import { Db, MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient | null = null // Initialize client outside conditional
let clientPromise: Promise<MongoClient> | null = null
let db: Db | null = null // Declare db variable for potential global storage

async function main() {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
      _mongoDb?: any // Add a dedicated property for the database
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    } else {
      client = await globalWithMongo._mongoClientPromise // Reuse existing client
    }

    if (!globalWithMongo._mongoDb) {
      // Create db only if not already created
      db = client.db('trade-details')
      globalWithMongo._mongoDb = db
    } else {
      db = globalWithMongo._mongoDb // Reuse existing db in development
    }

    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
    db = client.db('trade-details')
  }
}
main()

async function connectToDb() {
  if (!client) {
    client = (await clientPromise) as MongoClient
  }
  db = client.db('trade-details') // Create db after ensuring client connection
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Access the db instance:
export async function getDb() {
  await connectToDb() // Ensure connection before returning db
  if (!db) {
    throw new Error('Database connection not established yet.')
  }
  return db as Db
}
