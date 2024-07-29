import db from '../../../../utils/db'
import PostModel from '../../../../models/Post';

export async function GET(req, {params}) {
    try {
        await db();
        const postData = await PostModel.findOne({_id: params.id });
        return Response.json(postData);
    } catch (error) {
        return Response.json({message: error.message })
    }
}