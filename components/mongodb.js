import { MongoClient } from 'mongodb'

let uri = process.env.MONGO_URI
let dbName = process.env.MONGO_DB
let promise = null
let cached = null


if (!uri) throw new Error('Missing environment variable MONGO_URI')
if (!dbName) throw new Error('Missing environment variable MONGO_DB')

export async function connectToDatabase() {
  if (cached) return cached
  if (!promise) {
    promise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  const client = await promise
  const db = await client.db(dbName)
  cached = {
    client,
    db,
  }
  return cached
}
/*
export async function connectToDatabase() {
  if (global.connection) return global.connection
  if (!global.connectionPromise) {
    global.connectionPromise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  const client = await global.connectionPromise
  const db = await client.db(dbName)
  global.connection = {
    client,
    db,
  }
  return global.connection
}
*/
/*
import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
*/