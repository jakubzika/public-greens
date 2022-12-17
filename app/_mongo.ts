import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://zola:<redacted>@cluster0.snfwqhk.mongodb.net/?retryWrites=true&w=majority"

// const user = "f221_zikajak3"
// const password = "67282090"
// const database= "greens"

// const uri = `mongodb://${password}:$password@nosql.felk.cvut.cz:42222/${database}?authMechanism=DEFAULT&authSource=admin`

const client = new MongoClient(uri, {
})
const clientPromise:Promise<any> = client.connect()

export default clientPromise