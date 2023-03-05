import nodemailer from 'nodemailer';

const sendEmailBulk =async (email,subject,message,user,pass) =>{
    try {
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
        await transporter.sendMail({
            from : process.env.USER,
            to:email,
            subject:subject,
            text:message,
            // html:"<b><h1>deepakkumar</h1></b>"
        });
        console.log('email send successfully');
    } catch (error) {
        console.log('email not send');
        console.log(error);
    }
}

export default sendEmailBulk ;