import db from "../../../../../libs/db.js"
import authorization from "../../../../../middleware/authorization.js";
export default async function handler (req, res) {
    if(req.method !== "GET") return res.status(405).end();

    const {id} = req.query;
    const post = await db('posts').where({id}).first()
    const authMiddleware = await authorization(req, res)
    if(!post) return res.status(404).end()
    res.status(200);
    res.json({
        message: "Detail post",
        data: post,    
    })
   
    
}