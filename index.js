const express=require("express")
const app=express();

require("dotenv").config()

app.use(express.json())
require("./Config/database").DbConnect()

const fileUpload=require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

require('./Config/cloudinary').cloudinaryConnect()


const upload=require('./routes/upload')
app.use('/api/v1/upload', upload)

const PORT=process.env.PORT
app.listen( PORT  , ()=>{
    console.log(`App running in port ${PORT}`)
})

