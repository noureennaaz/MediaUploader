const File = require("../models/file");
const cloudinary = require("cloudinary").v2;


exports.fileupload = async (req, res) => {
  
  try{
    const file = req.files.file;

  const pathname = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

  file.mv(pathname, (err) => {
    if (err) console.log(err);

    res.json({
      success: true,
      message: "File uploaded",
    });
  });
  }  catch(err){
    console.log("Not able to upload the file on server")
        console.log(error);

  }
};

async function cloudinaryUpload(file, folder) {
  const options = { folder };
  options.resource_type = "auto";
  console.log(options);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

function checkSuppoted(file, SupportedFiles) {
  return SupportedFiles.includes(file);
}

exports.imageUpload = async (req, res) => {
  const SupportedTypes = ["jpg", "png", "jpeg"];

  const { name, email, imgurl, tags } = req.body;

  const file = req.files.file;

  const filetype = file.name.split(".")[1].toLowerCase();

  if (!checkSuppoted(filetype, SupportedTypes)) {
    return res.status(400).json({
      success: false,
      message: "file format not supported",
    });
  }

  const response = await cloudinaryUpload(file, "Fileuploader");
  console.log(response);

  const filedata = await File.create({
    name,
    tags,
    email,
    imgurl: response.secure_url,
  });

  return res.json({
    success: true,
    imgurl: response.secure_url,
    message: "Image Uploaded successfully",
  });
};

exports.videoUpload = async (req, res) => {
  const { name, email, tags } = req.body;

  const video = req.files.video;
  console.log("Info of the file-->>", video, "ends here");
  if (size / 1024 > 5) {
    return res.status(400).json({
      success: false,
      message: "file should be less than 5mb",
    });
  }
  const supportedVidTypes = ["mp4", "mov"];
  const fileType = video.name.split(".")[1].toLowerCase();
  if (!checkSuppoted(fileType, supportedVidTypes)) {
    return res.status(400).json({
      success: false,
      message: "file format not supported",
    });
  }

  const response = await cloudinaryUpload(video, "videoUpload");

  console.log(response);
 

  const videodata = await File.create({
    name,
    tags,
    email,
    imgurl: response.secure_url,
  });

  return res.json({
    success: true,
    imgurl: response.secure_url,
    message: "Image Uploaded successfully",
  });
};

exports.compressImageUpload = async (req, res) => {
  const SupportedTypes = ["jpg", "png", "jpeg"];

  const { name, email, imgurl, tags } = req.body;

  const file = req.files.file;

  const filetype = file.name.split(".")[1].toLowerCase();

  if (!checkSuppoted(filetype, SupportedTypes)) {
    return res.status(400).json({
      success: false,
      message: "file format not supported",
    });
  }

  options = {
    folder: "Fileuploader",
    resource_type: "auto",
    quality: 10,
  };

  console.log(options);

  const response = await cloudinary.uploader.upload(file.tempFilePath, options);

  return res.json({
    success: true,
    imgurl: response.secure_url,
    message: "Image Uploaded successfully",
  });

  const filedata = await File.create({
    name,
    tags,
    email,
    imgurl: response.secure_url,
  });
};

