const mysql=require('mysql2');
require('dotenv').config();
const connection=mysql.createConnection({
    host:process.env.host,
    database:process.env.database,
    password:process.env.password,
    user:process.env.user
});
connection.connect(error=>{
    if(error){
        console.log("error")
     throw error;
    }
    
})
module.exports=connection;