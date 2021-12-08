const express = require('express')
const router = express.Router()
const User = require('../models/user')
var CryptoJS = require("crypto-js")
const sgMail = require('@sendgrid/mail');
//jwt auth middleware
const jwt = require('jsonwebtoken');
const auth1 = require('./authenticate')
require("dotenv").config();

//getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().limit(50)
        res.json(users)
    } catch (err){
        res.satus(500).json({ message : err.message })
    }
})

//creating a user
router.post('/', async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const user = new User({
        blacklist: req.body.blacklist,
        email: req.body.email,
        name: req.body.name,
        password: (CryptoJS.SHA256(req.body.password)).toString(),
        phone: req.body.phone,
        role: req.body.role,
        waiver : req.body.waiver,
        bikeNumber: req.body.bikeNumber,
        isVerified: false
    });
    var jwtEmail = ''
    try {
        
        const newUser = await user.save()
        jwtEmail = jwt.sign({email:user.email, name:user.name}, process.env.JWT_SECRET);
    }catch (err){
        res.status(400).json({message: err.message })
    }
    const message = 
    {
       from: 'karanpatel7301@gmail.com',
       to: user.email,
       subject: 'BikeNGold- verify your email', 
       text: `
       Hello, thanks for registering on our site. 
       Please copy and paste the address below to verify your account.
     http://${req.protocol}://${req.headers.host}/users/verify-email/?jwtToken=${jwtEmail}`
     //https://${req.headers.host}/users/verify-email?jwtToken=${jwtEmail}  `
    }
    await sgMail.send(message)
        .then(response => {
          ret = {error: ''};
          res.status(200).send(ret);
        })
        .catch(error => res.send({error:error.message}));
})
router.get('/verify-email', async (req,res,next)=>{
    // incoming: jwtToken (from url, not from the request body)
          // outgoing: nothing 
        
          // Get jwtToken from the url
          const jwtEmail = req.query.jwtToken;
          var ret;
    
          // Redirect url (homepage)
          const redirect = `${req.protocol}://`+req.headers.host+`/`;
    
          try{
            // Verify the jwtToken, and then search for user
            const verifiedJwt = jwt.verify( jwtEmail, process.env.JWT_SECRET);
            const user = await User.find({email: verifiedJwt.email});
            // If user does not exist, log the message and redirect the user
            if (!user)
            {
              ret = {error: 'Trying to verify user that does not exist'};
              console.log(ret);
              return res.status(404).redirect(redirect);
            }
            console.log("hi");
            const work = await User.findOneAndUpdate({"email":verifiedJwt.email}, {"isVerified":true})
            // If user is successfully verified and saved, redirect the user to the homepage
            try
            {
                
                console.log('Successfully verified');
              res.status(200).redirect(redirect);
            }
            catch(error)
            {
              ret = {error1:error.message};
              console.log(ret);
            }
          }
          catch (error)
          {
            ret = {error2:error.message}
            console.log(ret);
          }
        });
//updating a user
router.patch('/', auth1, async (req, res) => {
    try{
        const updatedUser = await User.updateOne(
            {_id: req.body._id},
            { $set: {   blacklist: req.body.blacklist,
                        email: req.body.email,
                        name: req.body.name,
                        password: (CryptoJS.SHA256(req.body.password)).toString(),
                        phone: req.body.phone,
                        role: req.body.role,
                        waiver : req.body.waiver,
                        bikeNumber: req.body.bikeNumber } }
            )
            const retVal = await User.findOne({_id:req.body._id})
            res.json(retVal)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//deleteing a user
router.delete('/', auth1, async (req, res) => {
    try{
    const deletedUser = await User.deleteOne({_id: req.body._id})
    res.json(deletedUser)
    }catch(err){
        res.status(400).json({message: err.message })
    }
})
//loggin in a user
router.post('/login', async (req, res, next) => 
    {
      // incoming: Email, Password
      // outgoing: id, firstName, lastName, error
    
     var error = '';
    
      const  Email= req.body.email 
      const Password  = (CryptoJS.SHA256(req.body.password))
      const encrypt= Password.toString()

    
      //const db = client.db();
      //const results = await db.collection('Users').find({Email:email,Password:password}).toArray();
      
      const result =  await User.find({ email : Email, password :encrypt });
  
      //create valid json web token when user logs in, expires after 20 minutes
      const jwtToken = jwt.sign({_id: result._id}, process.env.JWT_SECRET, {expiresIn: '20m'});
      res.header('auth-token', jwtToken);
      //return sucess
      res.status(200).send({"result":result, "auth-token":jwtToken});
    });
//searching users 
router.post('/search', async (req, res, next) =>
{
try{
    const searchedUsers = await User.find({
    $and: [
        {blacklist:false},
        {$or:[
            {name:{$regex: req.body.key, $options: 'i'}},
            {phone:{$regex: req.body.key, $options: 'i'}},
            {email:{$regex: req.body.key, $options: 'i'}}
            ]},
    ]
    })
    res.json(searchedUsers)
}catch(err){
    res.status(400).json({message: err.message })
}
});
//searching blacklisted users
router.post('/blacklistSearch', async (req, res, next) =>
{
try{
    const searchedUsers = await User.find({
    $and: [
        {blacklist:true},
        {$or:[
            {name:{$regex: req.body.key, $options: 'i'}},
            {phone:{$regex: req.body.key, $options: 'i'}},
            {email:{$regex: req.body.key, $options: 'i'}}
            ]},
    ]
    });
    res.json(searchedUsers)
}catch(err){
    res.status(400).json({message: err.message })
}
});
//blacklisted users 
router.get('/blacklisted', async (req, res) => {
    try {
        const users = await User.find({blacklist:true})
        res.json(users)
    } catch (err){
        res.satus(500).json({ message : err.message })
    }
})
module.exports = router
