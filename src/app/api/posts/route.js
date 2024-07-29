import db from '../../../utils/db'
import Post from '../../../models/Post'

export async function GET(req) {
    const query = req.nextUrl.searchParams.get('q')
    try {
        await db()
        let response = ''
        if (query) {
            response = await Post.find({
                $or: [
                    {title: new RegExp(query,'i')},
                    {description: new RegExp(query,'i')},
                ]
            })
        } else {
            response = await Post.find({})
        }
        return Response.json(response)
    } catch (error) {
        return Response.json({message:error.message})
    }
}