import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { snacksRouter } from "./routes/snacks.js";
import { indianFoodsRouter } from "./routes/indianFoods.js";
import { coolDrinksRouter } from "./routes/coolDrinks.js";
import { chineseFoodsRouter } from "./routes/chineseFoods.js";
import { iceCreamsRouter } from "./routes/iceCreams.js";
import { soupRouter } from "./routes/soup.js";
import { usersRouter } from "./routes/users.js";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use("/snacks", snacksRouter);
app.use("/indianFoods", indianFoodsRouter);
app.use("/coolDrinks", coolDrinksRouter);
app.use("/chineseFoods", chineseFoodsRouter);
app.use("/iceCreams", iceCreamsRouter);
app.use("/soup", soupRouter);
app.use("/users", usersRouter);



app.get("/", (req, res) => {
  res.send("Hello i am started");
});


app.listen(PORT, () => {
  console.log(`server started in localhost:${PORT}`);
});
