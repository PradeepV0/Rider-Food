import { client } from "../db.js";
import {ObjectId} from 'mongodb'
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();



export function addUser(userDetails){
    return client 
    .db('ecomm')
    .collection("users")
    .insertOne(userDetails)
}

export function getUser(userEmail){
    return client 
    .db('ecomm')
    .collection("users")
    .findOne({email:userEmail})
}

export function getAllUser(){
    return client 
    .db('ecomm')
    .collection("users")
    .find()
    .toArray()
}


export function generateToken(id){
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"12hrs"})
  }
