import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
const MONGO_DB_URL = process.env.MONGO_DB_URL



export const client = await createConnection()


async function createConnection(){
    const client = new MongoClient(MONGO_DB_URL)
    await client.connect()
    console.log("MongoDB is sucessFully connected ")
    return client
}
