
const nodemailer=require("nodemailer");
exports.sendEmail=async (user)=>{
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure: true,
    auth:{
        user:"nidabeg234@gmail.com",
        pass:"vxoowdmhoyzpzldm"
    }

})
const info = await transporter.sendMail({
    from: '"Perfect-match" <nidabeg234@gmail.com>',
    to: user.email,
    subject: "hello",
    text: "welcome to  Perfect-Match.., The most authentic matrimonial platform ever.",
    html:`<b> ${user.name} </b> welcome to Perfect-Match, The most authentic matrimonial platform ever.`

})

console.log("Message sent: %s", info.messageId)
}
