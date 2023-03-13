import db from '../../../../libs/db.js'
import bycrypt from 'bcryptjs'
export default async function handler(req, res){
    if(req.method !== 'POST') return res.status(401).end()

    const {email, password} = req.body

    const salt = bycrypt.genSaltSync(10)
    const passwordHash = bycrypt.hashSync(password, salt)
    
    const register = await db('users').insert({
        email,
        password: passwordHash
    });
    console.log(register)
    const registedUser = await db('users').where({id: register[0]}).first()
    res.status(200).json({
        message: "Register user successfully",
        data: registedUser
    })
}