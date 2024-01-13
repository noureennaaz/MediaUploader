const File=require('../models/file')
const cloudinary =require('cloudinary').v2


exports.fileupload= async (req , res)=>{

    const file=req.files.file;

    const pathname=__dirname + '/files/'+Date.now() + `.${file.name.split('.')[1]}`
    console.log(pathname)

    file.mv(pathname , (err)=>{
        if(err)
            console.log(err)
        
        return res.json({
            success:true,
            message:'File uploaded'

        })
    })
}

async function cloudinaryUpload(file, folder){
    
    options={folder}
    
    return await cloudinary.uploader.upload(file.tempFilePath, options)

}

function checkSuppoted(file, SupportedFiles){
    return SupportedFiles.includes(file)
}

exports.imageUpload=async(req, res)=>{

    const SupportedTypes=["jpg", "png" , "jpeg"]

    const {name, email, imgurl, tags}=req.body;

    const file=req.files.file
 
    const filetype= file.name.split('.')[1].toLowerCase()
   
     if(!checkSuppoted(filetype, SupportedTypes)){
        return res.status(400).json({
            success:false,
            message: "file format not supported"
        })
     }
   
     const response =await cloudinaryUpload(file, 'Fileuploader')
     console.log(response)
     return res.json(
        {
            success:true, 
            imgurl:response.secure_url,
            message:'Image Uploaded successfully'
        }
     )

    // const filedata =await File.create({
    //     name, 
    //     tag, 
    //     email , 
    //     imgurl:response.secure_url
    // })
}