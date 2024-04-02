import { connectToDatabase } from "../plugins/mongodb";

export default defineEventHandler(async (event) => {
    // 환경 변수 확인
    if (!process.env.COLLECTION_NAME) {
        console.error('COLLECTION_NAME 환경 변수가 설정되지 않았습니다.');
        return createError({ statusCode: 500, statusMessage: 'Server configuration error' });
    }

    try {
        const { db } = await connectToDatabase();
        const coll = db.collection(process.env.COLLECTION_NAME);

        const { content } = await readBody(event);

        // 데이터 유효성 검증
        if (!content || typeof content !== 'string' || content.trim().length === 0) {
            return createError({ statusCode: 400, statusMessage: 'Valid content is required' });
        }

        const result = await coll.insertOne({ content: content.trim() });
        console.log('Document inserted with ID:', result.insertedId);
        return { success: true, id: result.insertedId };
    } catch (error) {
        console.error('Error in /api/data:', error);
        // MongoDB 연결 오류 처리
        if (error.message.includes('failed to connect to server')) {
            return createError({ statusCode: 500, statusMessage: 'Database connection error' });
        }
        // 데이터 삽입 오류 처리
        return createError({ statusCode: 500, statusMessage: 'Unexpected error occurred', error: error.message });
    }
});