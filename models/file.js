const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const Fileschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
});

Fileschema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWD,
      },
    });

    let info = await transporter.sendMail({
      from: '"Noureen Naaz👻" from- noureennaaz', // sender address
      to: doc.email, // list of receivers
      subject: "Image Uploaded", // Subject line
      text: "files uploaded to cloudinary", // plain text body
      html: `<h2>file uploaded successfully</h2> <p>View here <a href='${doc.imgurl}'> ${doc.imgurl}</a></p>`,
    });
    console.log("INFO ::", info);
  } catch (error) {
    console.error(error);
  }
});

const file = mongoose.model("file", Fileschema);
module.exports = file;
