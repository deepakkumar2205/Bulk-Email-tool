import express from 'express';
import { auth } from '../middleware/auth.js';
import { createUserCredential, findDataOfEmailCredential, getCredentialFromDB, getUserCredentialsFromDB, updateData } from '../services/emai.service.js';
import sendEmailBulk from '../utils/BulkEmail.js';
const router = express.Router();

//!below api is foront end api to use to send mail.
const API = "https://localhost:3000";

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
    console.log(resData);
    if(resData === null){
      response.status(404).send({message:"not-available"})
    }else{
      response.send(resData)
    }
})

router.post('/sendEmails',auth,express.json(),async function(request, response){
  const {emails ,subject , htmlTemplate} = request.body
    const user= request.header("user")
    const {email , password} =  await getUserCredentialsFromDB(user)
    const result =await sendEmailBulk(emails, subject , htmlTemplate , email , password);
    response.send(result)

})

export default router

