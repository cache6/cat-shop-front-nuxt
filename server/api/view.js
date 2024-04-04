import { connectToDatabase } from "../plugins/mongodb";
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
    const params = event.context.params;
    const id = params.id;

    if (!process.env.COLLECTION_NAME) {
        console.error('COLLECTION_NAME 환경 변수가 설정되지 않았습니다.');
        return createError({ statusCode: 500, statusMessage: 'Server configuration error' });
    }

    try {
        const { db } = await connectToDatabase();
        const coll = db.collection(process.env.COLLECTION_NAME);
        console.log('Connected to database');

        if (!id) {
            return createError({ statusCode: 400, statusMessage: 'ID parameter is required' });
        }

        const objectId = new ObjectId(String(id));
        const invoice = await coll.findOne({ _id: objectId });

        // 조회된 데이터를 반환합니다.
        return invoice;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return createError({ statusCode: 500, statusMessage: 'Database query error' });
    }
});

