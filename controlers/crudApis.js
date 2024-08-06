import { client } from "../db.js";
import {ObjectId} from 'mongodb'


export function create(collectionName,createObj){
    return client
    .db('ecomm')
    .collection(collectionName)
    .insertOne(createObj)
}

export function getAll(collectionName){
    return client
    .db("ecomm")
    .collection(collectionName)
    .find({})
    .toArray()
}

export function getQuery(collectionName,query){
    return client
    .db("ecomm")
    .collection(collectionName)
    .find(query)
    .toArray()
}

export function update(collectionName,data){
    const {_id,...obj} = data
    const objId = new ObjectId(_id);  
    return client
    .db('ecomm')
    .collection(collectionName)
    .updateOne({_id : objId},{$set:obj})
}

export function remove(collectionName,id){
    return client
    .db('ecomm')
    .collection(collectionName)
    .deleteOne({_id : id})
}

export function getById(collectionName,id){
    return client
    .db('ecomm')
    .collection(collectionName)
    .findOne({_id:id})   
}

export function createMany(collectionName,createArray){
    return client
    .db('ecomm')
    .collection(collectionName)
    .insertMany(createArray)
}