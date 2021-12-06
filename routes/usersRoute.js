const express = require('express')
const router = express.Router()
const User = require('../models/user')
//jwt auth middleware
const jwt = require('jsonwebtoken');
const auth1 = require('./authenticate')

//getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().limit(50)
        res.json(users)
    } catch (err){
        res.status(500).json({ message : err.message })
    }
})

//creating a user
router.post('/', async (req, res) => {
    const user = new User({
        blacklist: req.body.blacklist,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
        waiver : req.body.waiver
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch (err){
        res.status(400).json({message: err.message })
    }
})
//updating a user
router.patch('/', auth1, async (req, res) => {
    try{
        const updatedUser = await User.updateOne(
            {_id: req.body._id},
            { $set: {   blacklist: req.body.blacklist,
                        email: req.body.email,
                        name: req.body.name,
                        password: req.body.password,
                        phone: req.body.phone,
                        role: req.body.role,
                        waiver : req.body.waiver } }
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
      const  Email= req.body.email 
      const Password  = req.body.password
      const result =  await User.findOne({ email : Email, password : Password });

      //create valid json web token when user logs in, expires after 20 minutes
      const jwtToken = jwt.sign({_id: result._id}, process.env.JWT_SECRET, {expiresIn: '20m'});
      res.header('auth-token', jwtToken);
      //return sucess
      res.status(200).json(result);
    });
//searching users 
router.post('/search', async (req, res, next) =>
{
try{
    const searchedUsers = await User.find({$or:[
    {name:{$regex: req.body.key, $options: 'i'}},
    {phone:{$regex: req.body.key, $options: 'i'}},
    {email:{$regex: req.body.key, $options: 'i'}}
    ]})
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
