const express=require('express')
const router=express.Router();

const {fileupload, imageUpload, videoUpload, compressImageUpload}=require('../controllers/fileupload')

router.post('/localFileUploads',fileupload)
router.post('/imageUpload', imageUpload)
router.post('/videoUpload', videoUpload)
router.post('/compressImageUpload', compressImageUpload)

module.exports=router