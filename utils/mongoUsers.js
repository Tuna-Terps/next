

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI_users
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  //poolSize: 200,
}

let client
let clientPromise

if (!process.env.MONGODB_URI_users) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// users, this will be used to verify users
/*
import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI_W_Users
let dbName = process.env.MONGODB_W_Users
let promise = null
let cached = null


if (!uri) throw new Error('Missing environment variable MONGO_URI')
if (!dbName) throw new Error('Missing environment variable MONGO_DB')

export async function connectToDatabaseUsers() {
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
*/
/*
export async function connectToDatabaseUsers() {
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