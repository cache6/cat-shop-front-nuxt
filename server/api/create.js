import { connectToDatabase } from "../plugins/mongodb";

export default defineEventHandler(async (event) => {
    if (!process.env.COLLECTION_NAME) {
        console.error('COLLECTION_NAME 환경 변수가 설정되지 않았습니다.');
        return createError({ statusCode: 500, statusMessage: 'Server configuration error' });
    }

    try {
        const { db } = await connectToDatabase();
        const coll = db.collection(process.env.COLLECTION_NAME);

        const body = await readBody(event);
        const { title, inputData, createdAt, author } = body;

        // 데이터 유효성 검증
        if (!inputData || typeof inputData !== 'string' || inputData.trim().length === 0 ||
            !title || typeof title !== 'string' || title.trim().length === 0 ||
            !createdAt || typeof createdAt !== 'string' || createdAt.trim().length === 0 ||
            !author || typeof author !== 'string' || author.trim().length === 0) {
            return createError({ statusCode: 400, statusMessage: 'All fields are required and must be valid strings' });
        }

        const document = {
            title: title.trim(),
            inputData: inputData.trim(),
            createdAt: createdAt.trim(),
            author: author.trim(),
        };

        const result = await coll.insertOne(document);
        console.log('Document inserted with ID:', result.insertedId);
        return { success: true, id: result.insertedId };
    } catch (error) {
        console.error('Error in /api/create:', error);
        if (error.message.includes('failed to connect to server')) {
            return createError({ statusCode: 500, statusMessage: 'Database connection error' });
        }
        return createError({ statusCode: 500, statusMessage: 'Unexpected error occurred', error: error.message });
    }
});