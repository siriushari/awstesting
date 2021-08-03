const express = require ('express')
const db = require('../model/db')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/',(req, res)=>{
    res.status(200).json({
        status : 'success',
        message : 'Welcome to NodeJS.'
    })
})

//create user
router.post('/create', async(req, res)=>{
    const {user_name, user_email, user_password} = req.body
    const hashedpassword = await bcrypt.hash(user_password, 8)
   const data = {
         user_name ,
         user_email,
        user_password :hashedpassword
    }
    let sql = 'insert into users set?'
    let query = db.query(sql,[data],(err, results)=>{
        if(err){
            return res.status(400).json({
                status : 'failure',
                message : err
            })
        }else{
            return res.status(201).json({
                status : 'success',
                message : 'user created successfully.'
            })
        }
    })    
})

//list users
router.get('/listusers',(req, res)=>{
    let sql = 'select * from users'
    let query = db.query(sql,(err, results)=>{
        if(err){
            return res.status(400).json({
                status : 'failure',
                message : err
            })
        }else{
            return res.status(200).json({
                status : 'success',
                message : 'Feching users',
                data : results
            })
        }
    })
})

//list user
router.get('/:id',(req, res)=>{

    let user_id = req.params.id
    let sql = 'select * from users where user_id=?'
    let query = db.query(sql,[user_id],(err, result)=>{
        if(user_id > result){
            return res.status(400).json({
                status : 'failure',
                message : 'please provide a valid userid.'
            })
        }
        if(err){
            return res.status(400).json({
                status :'failure',
                message : err
            })
        }else{
            return res.status(200).json({
                status : 'success',
                message : 'Fetching user',
                data : result
            })
        }
    })
})

router.put('/:id', async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['user_email', 'user_password']
    const isvalidoperation = updates.every((update)=>  allowedupdates.includes(update))
    if(!isvalidoperation){
        return res.status(400).json({
            status : 'failure',
            message : 'invalid update'
        })
    }
    try{
        
       const user_id = req.params.id
       const {user_email, user_password} = req.body
       const hashedpassword = await bcrypt.hash(user_password, 8)
       const data = {
           user_email,
           user_password : hashedpassword
       }
        let sql = 'update users set? where user_id=?'
        let query = db.query(sql,[data, user_id],(err, result)=>{
        //    if(user_id > result){
        //        return res.status(400).json({
        //            status : 'failure',
        //            message : 'invalid id'
        //        })
        //    }
           
         if(err){
                return res.status(400).json({
                   status : 'failure',
                    data : err
                })
            }else{
                return res.status(200).json({
                    status : 'success',
                    messaage : 'user updated.',
                    data : result
                })
            }
        })


    }catch(e){
            console.log(e)
    }
})


module.exports = router