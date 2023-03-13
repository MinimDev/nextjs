import db from "../../../../../libs/db.js";
import authorization from "../../../../../middleware/authorization.js";
export default async function handler(req, res){
    if(req.method !== "DELETE") return res.status(405).end();
    const authMiddleware = authorization(req,res)
    const {id} = req.query;

    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);
    
    
    const deleted = await db('posts').where({id: id}).del();
    
    res.status(200).json({
        message: "Post deleted successfully",
        data: id
    })
}