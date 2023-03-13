import db from "../../../../libs/db.js";
import authorization from "../../../../middleware/authorization.js";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const authMiddleware = authorization(req, res)
  const {title, content} =  req.body;
  if( typeof title === 'undefined' || typeof content === 'undefined') return res.status(400).json({
    "msg":"Bad input request!"
  });
  const created = await db("posts").insert({
    title,
    content,
  });

  const createdData = await db("posts").where('id', created[0]).first();
  res.status(200);
  res.json({
    message: "Post created successfully",
    data: createdData
  });
}
