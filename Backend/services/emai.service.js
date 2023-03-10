import { ObjectId } from 'mongodb';
import { client } from '../index.js';

// Data base name declared below :
const dataBaseName = 'Bulk-Email-Sender'

export async function createUser(data) {
    return await client.db(dataBaseName).collection("users").insertOne(data);
}

export async function findDataOfEmailCredential(data) {
    return await client.db(dataBaseName).collection("mail-credentials").findOne({user:data.user});
}

export async function createUserCredential(data) {
    return await client.db(dataBaseName).collection("mail-credentials").insertOne(data);
}

export async function updateData(data) {
    return await client.db(dataBaseName).collection("mail-credentials").updateOne({user:data.user},{$set:{email:data.email,password:data.password}});
}

export async function getCredentialFromDB(data) {
    return await client.db(dataBaseName).collection("mail-credentials").findOne({user:data});
}

export async function getUserCredentialsFromDB(user){
    return await client.db(dataBaseName).collection("mail-credentials").findOne({user:user})
}

export async function delCredentialsFromDB(user){
    return await client.db(dataBaseName).collection("mail-credentials").deleteOne({user:user})
}

export async function saveLogDataInDB(data){
    return await client.db(dataBaseName).collection("logCollect").insertOne(data)
}

export async function getLogDetailsFromDB(data){
    return await client.db(dataBaseName).collection("logCollect").find({user:data}).toArray()
}

export async function getDataFromDBofRange(user,start,end){
    return await client.db(dataBaseName).collection("logCollect").find({user:user,time:{$gt:new Date(start),$lt:new Date(end)}},{projection:{time:1,accepted:1}}).toArray()
}

export async function getMailSentInfoFromDb(user,start,end){
    return await client.db(dataBaseName).collection("logCollect").find({user:user,time:{$gt:new Date(start),$lt:new Date(end)}},{projection:{time:1,accepted:1}}).toArray()
}
export async function getUserNamefromDb(user){
    return await client.db(dataBaseName).collection("users").findOne({_id:new ObjectId(user)},{projection:{userName:1}})
}