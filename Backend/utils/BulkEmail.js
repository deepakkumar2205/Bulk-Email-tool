import nodemailer from 'nodemailer';

const sendEmailBulk =async (email,subject,message,user,pass) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        post: process.env.EMAIL_PORT,
        secure: Boolean(process.env.SECURE),
        auth:{
            user:user,
            pass:pass
        }
    })
    const info = await transporter.sendMail({
        from : process.env.USER,
        to:email,
        subject:subject,
        // text:message,
        html:message
    });
    console.log(message);
    return info
    // try {
    // console.log('email send successfully');
    // } catch (error) {
    //     console.log('email not send');
    //     console.log(error);
    // }
}

export default sendEmailBulk ;