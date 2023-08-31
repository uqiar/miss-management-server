const nodemailer =require("nodemailer");

const mail=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"etourfun@gmail.com",
        pass:"dwzztljogtvhqnld"
    }
})

exports.sendMail = async (sendTo,subject,html) => {
const mailOption={
  from:"etourfun@gmail.com",
  to:sendTo,
  subject,
  text:"",
  html
}

mail.sendMail(mailOption,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log("Email Sent: "+info.response)
    }
})
}