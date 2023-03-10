import nodemailer from 'nodemailer';

const sendEmail =async (email,subject,text) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: process.env.EMAIL_PORT,
            secure: Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        const info= await transporter.sendMail({
            from : process.env.USER,
            to:email,
            subject:subject,
            // text:`This link will expired within 15 minutes use it befor expired or else generate new link and continue the process  ${text}`,
            html:`  <div style="display: flex; justify-content: center; align-items: center; height: 80vh; width: 100vw; ">
            <div className="border" style="height: 300px; width: 400px; border: 3px solid black; padding: 10px; border-radius: 15px;">
                <h1 style="background-color: black; color: white; border: 3px solid black; border-radius: 15px 15px 0 0; display:flex;     align-items: center !important; margin:0px"><img style="width: 50px; padding: 5px; margin-left: 13px;" src="https://www.iconsdb.com/icons/preview/red/email-5-xxl.png" alt=""> 
                <span style="display:flex; padding-top: 11px;">Bulk Email Tool</span>
                </h1>
                <h3>${subject}</h3>
                <hr>
                <p>This link will expired within 15 minutes use it befor expired or else generate new link and continue the process.</p>
                <a href="${text}" target="_blank">click here</a>

            </div>
        </div>
            `
        });
        return info
    } catch (error) {
        return error
    }
}

export default sendEmail ;