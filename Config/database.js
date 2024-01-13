const mongoose=require('mongoose');
require('dotenv').config()

exports.DbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('DB connection Established')
    }).catch(
        ()=>{
            console.log('Problem in connecting to Db');
        }
    )
}
