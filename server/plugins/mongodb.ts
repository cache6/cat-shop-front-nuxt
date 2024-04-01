import { MongoClient, ServerApiVersion } from 'mongodb'

// Ensure MONGODB_URI is a string, if not throw an error
const MONGODB_URI = process.env.MONGODB_URI
if (typeof MONGODB_URI !== 'string') {
    throw new Error('MONGODB_URI is not defined or is not a string.')
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect()
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 })
        console.log("Pinged your deployment. You successfully connected to MongoDB!")
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error; // Rethrow after logging
    }
    // Consider when and how you want to close the connection
}
run().catch(console.dir)
