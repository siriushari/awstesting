const mysql = require ('mysql')

const db = mysql.createConnection({
    host : 'localhost',
    user :'root',
    password : '',
    database :'loginandregister'
})

db.connect((err, result)=>{
    if(err){
        return console.log(err)
    }else{
        return console.log('MySQL Connected...')
    }
})

module.exports = db