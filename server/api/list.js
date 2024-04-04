import { connectToDatabase } from "../plugins/mongodb";

export default defineEventHandler(async (event) => {
    if (!process.env.COLLECTION_NAME) {
        console.error('COLLECTION_NAME 환경 변수가 설정되지 않았습니다.');
        return createError({ statusCode: 500, statusMessage: 'Server configuration error' });
    }

    try {
        const { db } = await connectToDatabase();
        const coll = db.collection(process.env.COLLECTION_NAME);

        // MongoDB에서 모든 문서를 조회합니다.
        const invoices = await coll.find({}).toArray();
        // 조회된 데이터를 반환합니다.
        return invoices;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        // Handle ECONNRESET error specifically
        if (error.code === 'ECONNRESET') {
            console.error('Connection was reset');
            return createError({ statusCode: 503, statusMessage: 'Service temporarily unavailable' });
        }
        return createError({ statusCode: 500, statusMessage: 'Database query error' });
    }
});
