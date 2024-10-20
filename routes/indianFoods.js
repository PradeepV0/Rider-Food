import express from "express";
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongodb";
import {
  create,
  createMany,
  getAll,
  getById,
  getQuery,
  remove,
  update,
} from "../controlers/crudApis.js";

const router = express.Router();

router.post("/Create", async (req, res) => {
  try {
    const ecomm = await create("indianFoods", req.body);
    res.send(ecomm);
  } catch (err) {
    console.log(err);
    res.status(500).json({data:"internal Server Error"})
  }
});

router.get("/get-all", async (req, res) => {
  try {
    // const token = req.headers["x-auth-token"]
    // jwt.verify(token,process.env.SECRET_KEY)
    const ecomm = await getAll("indianFoods");
    res.status(200).json(ecomm);
  } catch (err) {
    // console.log(err);
    res.status(500).json({erMsg : 'Internal Server Error'})
  }
});

router.get("/", async (req, res) => {
  try{
    const token = req.headers["x-auth-token"]
    jwt.verify(token,process.env.SECRET_KEY)
    const ecomm = await getQuery("indianFoods", req.query);
    res.status(200).json(ecomm);
  }catch (err){
    res.status(500).json({data:"internal Server Error"})

  }
});

router.put("/Update", async (req, res) => {
  try {
    const token = req.headers["x-auth-token"]
    jwt.verify(token,process.env.SECRET_KEY)
    const ecomm = await update("indianFoods", req.body);
    res.status(200).json(ecomm);
    
  } catch (error) {
    res.status(500).json({data:"internal Server Error"})

  }
});

router.delete("/Delete/:id", async (req, res) => {
  try {
    const token = req.headers["x-auth-token"]
    jwt.verify(token,process.env.SECRET_KEY)    
    const id = req.params.id;
    const objId = new ObjectId(id);
    const ecomm = await remove("indianFoods", objId);
    res.send(ecomm);
  } catch (error) {
    res.status(500).json({data : "internal Server Error"})
  }
});

router.get("/:id", async (req, res) => {
  try {
    // const token = req.headers["x-auth-token"]
    // jwt.verify(token,process.env.SECRET_KEY)
    const { id } = req.params;
    console.log(id);
    const objectId = new ObjectId(id);
    const ecomm = await getById("indianFoods", objectId);
    res.send(ecomm).status(200);
    
  } catch (error) {
    res.status(500).json({data:"internal Server Error"})

  }
});

router.post('/create/Many', async (req, res) => {
  try {
    // const token = req.headers["x-auth-token"]
    // jwt.verify(token,process.env.SECRET_KEY)
    const ecomm = await createMany("indianFoods", req.body);
    res.send(ecomm).status(200)
  } catch (error) {
    res.status(500).json({data:"internal Server Error"})
  }
})

export const indianFoodsRouter = router;
