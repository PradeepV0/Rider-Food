import express from "express"
import bcrypt from 'bcrypt'
import { addUser, generateToken, getAllUser, getUser } from "../controlers/users.js";


const router = express.Router();


router.post('/signup',async(req,res)=>{
    console.log('hii');
     
    try {
        const user = await getUser(req.body.email)
        const salt = await bcrypt.genSalt(10)
        console.log(salt,'salt',user);   
        if(!user){
            const hashedPasword = await bcrypt.hash(req.body.password,salt)
            console.log(hashedPasword);  
            const hasedUser = {...req.body,password:hashedPasword}
            const result = await addUser(hasedUser)
            res.status(200).json({message:"SuccessFully Signed Up"})
        }
            res.status(400).json({errMsg:"Given Email Is Already Exist"})
        } catch (error) {
        console.log('Error Occured',error);
        res.status(50).json({data:'Internal Server Error'})

    }
})

router.post('/signin',async(req,res)=>{
    try {        
        const user = await getUser(req.body.email)    
        console.log(user,'user');
        const token =  generateToken(user._id)
    console.log(token);    
    if(user === null){
        res.status(404).json({errMsg :'User Name Or Password Wrong'})
        return
    }    
    const isaValidPassword = await bcrypt.compare(req.body.password, user.password);      
        if(!isaValidPassword){
            res.status(404).json({errMsg :'User Name Or Password Wrong'})
        return
        }
        res.status(200).json({message : 'SucessFully Logged in..',token})
    } catch (error) {
        res.status(400).json({errMsg : "Internal Server Error"})        
    }
})


router.get("/get-all", async (req, res) => {
    try{
  
      const ecomm = await getAllUser();
      res.status(200).json(ecomm);
    }catch (err){
      res.status(500).json({data:"internal Server Error"})
  
    }
  });




export const usersRouter = router;
