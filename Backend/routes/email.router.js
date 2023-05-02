import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createUserCredential,
  delCredentialsFromDB,
  findDataOfEmailCredential,
  getCredentialFromDB,
  getDataFromDBofRange,
  getLogDetailsFromDB,
  getMailSentInfoFromDb,
  getUserCredentialsFromDB,
  getUserNamefromDb,
  saveLogDataInDB,
  updateData,
} from "../services/emai.service.js";
import sendEmailBulk from '../utils/BulkEmail.js';
const router = express.Router();

//!below api is foront end api to use to send mail.
const API = "https://bulk-emailtool.netlify.app";

router.post('/settings',auth,express.json(),async function(request, response){
    const { email, password, user  } = request.body;
    const presentOrNot =  await findDataOfEmailCredential(request.body);
    if(presentOrNot){                        
      const updateRes = await updateData(request.body );
      response.status(200).send({message:"updated",...updateRes})
    }else{
      const dta = await createUserCredential(request.body)
        response.status(200).send({message: "created",...dta})
    }
  })

router.get('/getCredential',auth,express.json(),async function(request, response){
    const user= request.header("user")
    const resData  = await getCredentialFromDB(user)
    if(resData === null){
      response.status(404).send({message:"not-available"})
    }else{
      response.send(resData)
    }
})

router.get('/getMailSendToday',auth,express.json(),async function(request, response){
    const user= request.header("user")
    const start = new Date( new Date().toDateString())
    const end   = new Date(new Date(start).setDate(new Date().getDate()+1))
    const resData  = await getMailSentInfoFromDb(user,start,end)
    const getName = await getUserNamefromDb(user);
    let count = 0 ;
    resData.forEach((e)=>count+=e.accepted.length)
    response.send({count:count,name:getName.userName})
})

router.post('/sendEmails',auth,express.json(),async function(request, response){
  const {emails ,subject , htmlTemplate} = request.body
    const user= request.header("user")
    const cred =  await getUserCredentialsFromDB(user)
    if(cred === null){
      let userEmailDef = process.env.USER
      let passDef = process.env.PASS
      const result =await sendEmailBulk(emails, subject , htmlTemplate , userEmailDef , passDef );
      const log = {
        user: user,
        from : userEmailDef,
        to : emails,
        subject: subject,
        htmlTemplate,htmlTemplate,
        accepted:result.accepted == null?[]:result.accepted,
        rejected:result.rejected == null?[]:result.rejected,
        time: new Date()
      }
      const logRes = await saveLogDataInDB(log)
      
      response.send({...result,log:logRes})
    }else{
      const result =await sendEmailBulk(emails, subject , htmlTemplate , cred.email , cred.password);
      const log = {
        user: user,
        from : cred.email,
        to : emails,
        subject: subject,
        htmlTemplate,htmlTemplate,
        accepted:result.accepted == null?[]:result.accepted,
        rejected:result.rejected == null?[]:result.rejected,
        time: new Date()
        
      }
      const logRes = await saveLogDataInDB(log)

      response.send({...result,log:logRes})
    }

})

router.delete('/deleteCred',auth,express.json(),async function(request, response){
    const user= request.header("user")
    const cred =  await delCredentialsFromDB(user)
      response.send(cred)
})

router.get('/getLogDetailsData',auth,express.json(),async function(request, response){
    const user= request.header("user")
    const result =  await getLogDetailsFromDB(user)
      response.send(result)
})

router.post('/getGraphData', auth, express.json(),async function(request, response) {
  const user = request.header("user")
  const {startDate , endDate} = request.body ;
  const resData = await getDataFromDBofRange(user,startDate,endDate);
  const array= [];
  resData.forEach(e=>array.push({
    time:e.time,
    mailCount:e.accepted.length
  }))
  
  response.send({message:"working",data:array})
})

export default router

