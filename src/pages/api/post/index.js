import db from "../../../../libs/db.js"
import authorization from "../../../../middleware/authorization.js";
export default async function handler (req, res) {
    if(req.method !== "GET") return res.status(405).end();

    const list_posts = await db('posts')
    const authMiddleware = await authorization(req, res)

    res.status(200);
    res.json({
        message: "List  of Posts",
        data: list_posts,    
    })
   
    
}