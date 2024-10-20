import express from "express"
import bcrypt from 'bcrypt'
import { addUser, generateToken, getAllUser, getUser } from "../controlers/users.js";


const router = express.Router();


router.post('/signup', async (req, res) => {
    console.log('Request received:', req.body);
    
    try {
        const user = await getUser(req.body.email);
        if (user) {
            return res.status(400).json({ errMsg: "Given Email Already Exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedUser = { ...req.body, password: hashedPassword };
        const result = await addUser(hashedUser);
        return res.status(201).json({ message: "Successfully Signed Up", data: result });
    } catch (error) {
        console.log('Error Occurred:', error);
        return res.status(500).json({ data: 'Internal Server Error' });
    }
});


router.post('/signin', async (req, res) => {
    try {        
        const user = await getUser(req.body.email);
                if (!user) {
            return res.status(404).json({ errMsg: 'User Name Or Password Wrong' });
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({ errMsg: 'User Name Or Password Wrong' });
        }
        
        const token = generateToken(user._id);
        
        res.status(200).json({ message: 'Successfully Logged in..', token });
    } catch (error) {
        res.status(500).json({ errMsg: 'Internal Server Error' });        
    }
});


router.get("/get-all", async (req, res) => {
    try{
  
      const ecomm = await getAllUser();
      res.status(200).json(ecomm);
    }catch (err){
      res.status(500).json({data:"internal Server Error"})
  
    }
  });




export const usersRouter = router;
