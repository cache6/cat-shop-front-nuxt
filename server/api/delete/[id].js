import { connectToDatabase } from "../../plugins/mongodb";
import { ObjectId } from 'mongodb';
import { send } from 'h3';

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

        if (!id) {
            return createError({ statusCode: 400, statusMessage: 'ID parameter is required' });
        }

        const objectId = new ObjectId(String(id));
        const invoice = await coll.deleteOne({ _id: objectId });

        if (!invoice) {
            return createError({ statusCode: 404, statusMessage: 'Invoice not found' });
        }

        // 객체를 JSON 문자열로 변환하여 전송
        return send(event, JSON.stringify(invoice), 'application/json');
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return createError({ statusCode: 500, statusMessage: 'Database query error' });
    }

});