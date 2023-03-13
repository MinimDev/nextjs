import db from '../../../../libs/db.js'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    if(req.method !== "POST") return res.status(401).end()
    const {email, password} = req.body

    const checkUser = await db('users').where({email}).first(); 
    if(!checkUser) return res.status(401).end();

    const checkPassword = await bycrypt.compare(password, checkUser.password)
    if(!checkPassword) return res.status(401).end()

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.email
    },process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: "1d"
    })
    res.status(200).json({
        message: "Login successfully!",
        token
    })
}