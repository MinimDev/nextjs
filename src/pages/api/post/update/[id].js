import db from "../../../../../libs/db.js";
import authorization from "../../../../../middleware/authorization.js";

export default async function handler(req, res){
    if(req.method !== "PUT") return res.status(405).end();
    const authMiddleware = authorization(req, res)
    const {id} = req.query;
    const {title, content} = req.body;

    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);
    
    
    const updated = await db('posts').where({id: id}).update({title: title, content:content, updated_at: date   });
    const updatedData = await db('posts').where({id}).first();
    res.status(200).json({
        message: "Post updated successfully",
        data: updatedData
    })
}