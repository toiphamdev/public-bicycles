const nodemailer = require('nodemailer');
require('dotenv').config();

const sendSimpleEmail = async (otp, userEmail) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_APP, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Dịch vụ cho thuê xe công cộng 👻" ${process.env.EMAIL_APP}`, // sender address
      to: userEmail, // list of receivers
      subject: 'Đăng kí vé xe đạp', // Subject Hi
      text: 'Chao quý khách! ', // plain text body
      html: `<b> Kính chào quý khách, bạn đang đăng nhập dịch vụ của ViettellPost bằng mã OTP. Mã OTP của bạn la ${otp}. Vui lòng không chia sẻ mã này với người khác để bảo mật thông tin của bạn</b>`, // html body
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendSimpleEmail,
};
