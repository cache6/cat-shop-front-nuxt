import { connectToDatabase } from "../../plugins/mongodb";
import { ObjectId } from 'mongodb';
import { send, createError, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const params = event.context.params;
    const id = params.id;
    const body = await readBody(event); // 요청 본문에서 데이터를 가져옵니다.


    // Check if COLLECTION_NAME is set
    if (!process.env.COLLECTION_NAME) {
        console.error('COLLECTION_NAME 환경 변수가 설정되지 않았습니다.');
        return createError({ statusCode: 500, statusMessage: 'Server configuration error' });
    }

    // Validate the id
    if (!id || id.length !== 24 || !ObjectId.isValid(id)) {
        return createError({ statusCode: 400, statusMessage: 'Invalid ID format' });
    }

    try {
        const { db } = await connectToDatabase();
        const coll = db.collection(process.env.COLLECTION_NAME);

        const objectId = new ObjectId(id);
        const invoice = await coll.updateOne({ _id: objectId }, { $set: { title: body.title, inputData: body.inputData } });

        if (!invoice) {
            return createError({ statusCode: 404, statusMessage: 'Invoice not found' });
        }

        // Send the invoice as JSON
        return send(event, JSON.stringify(invoice), 'application/json');
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return createError({ statusCode: 500, statusMessage: 'Database query error' });
    }
});