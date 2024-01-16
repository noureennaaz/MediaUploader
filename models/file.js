const mongoose = require("mongoose");
const MailSender= require("../controllers/MailSender");

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

// async function Sendmail(email, imgurl){
//   await MailSender();
// }
Fileschema.post("save", async function (doc) {
  
  console.log("info ---->>>>", doc.email , doc.imgurl)
  await MailSender(doc.email , doc.imgurl)
  
});

const file = mongoose.model("file", Fileschema);
module.exports = file;
