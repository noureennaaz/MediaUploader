const express=require('express')
const router=express.Router();

const {fileupload, imageUpload}=require('../controllers/fileupload')

router.post('/localFileUploads',fileupload)
router.post('/imageUpload', imageUpload)
module.exports=router