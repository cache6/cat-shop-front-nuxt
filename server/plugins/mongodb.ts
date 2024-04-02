import { MongoClient, Db, ServerApiVersion } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
if (typeof MONGODB_URI !== 'string') {
    throw new Error('MONGODB_URI is not defined or is not a string.')
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// MongoDB에 연결하고, 연결된 데이터베이스 객체와 클라이언트를 반환하는 함수
export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { db: cachedDb, client: cachedClient };
    }

    const client = new MongoClient(process.env.MONGODB_URI!, {
        serverApi: ServerApiVersion.v1,
    });

    await client.connect();
    const db = client.db(process.env.DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { db, client };
}

export default connectToDatabase;

// 이 함수는 예제로 제공되며, 실제 사용 시에는 필요에 따라 수정하거나 제거할 수 있습니다.
async function run() {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error("Database connection failed", error);
    }
}
run().catch(console.dir);