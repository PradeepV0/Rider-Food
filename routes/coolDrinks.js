import express from 'express';
import {ObjectId} from 'mongodb'
import {
  create,
  createMany,
  getAll,
  getById,
  getQuery,
  remove,
  update,
} from "../controlers/crudApis.js";

const router = express.Router()

router.post("/Create", async (req, res) => {
  try {
    const ecomm = await create("coolDrinks", req.body);
    res.send(ecomm);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const ecomm = await getAll("coolDrinks");
    res.status(200).json(ecomm);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const ecomm = await getQuery("coolDrinks", req.query);
  res.status(200).json(ecomm);
});

router.put("/Update", async (req, res) => {
  const ecomm = await update("coolDrinks", req.body);
  res.status(200).json(ecomm);
});

router.delete("/Delete/:id", async (req, res) => {
  const id = req.params.id;
  const objId = new ObjectId(id);
  const ecomm = await remove("coolDrinks", objId);
  res.send(ecomm);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const objectId = new ObjectId(id);
  const ecomm = await getById("coolDrinks", objectId);
  res.send(ecomm).status(200);
});

router.post('/create/Many', async (req, res) => {
  const ecomm = await createMany("coolDrinks", req.body);
  res.send(ecomm).status(200)
})
  
  export const coolDrinksRouter = router