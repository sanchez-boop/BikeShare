const express = require('express')
const router = express.Router()
const User = require('../models/user')

//getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.satus(500).json({ message : err.message })
    }
})

//creating a user
router.post('/', async (req, res) => {
    const user = new User({
        blacklist: req.body.blacklist,
        email: req.body.email,
        firstName: req.body.firstName,
        id: req.body.id,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
        waiver : req.body.waiver,
        bikeNumber: req.body.bikeNumber
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch (err){
        res.status(400).json({message: err.message })
    }
})
//updating a user
router.patch('/', async (req, res) => {
    try{
        const updatedUser = await User.updateOne(
            {_id: req.body._id},
            { $set: {   blacklist: req.body.blacklist,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: req.body.password,
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
router.delete('/', async (req, res) => {
    try{
    const deletedUser = await User.deleteOne({id: req.body.id})
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
      const Password  = req.body.password
    
      //const db = client.db();
      //const results = await db.collection('Users').find({Email:email,Password:password}).toArray();
      const results =  await User.find({ email : Email, password : Password });
    
      var id = -1;
      var fn = '';
      var ln = '';
    
      if( results.length > 0 )
      {
        id = results[0].id;
        fn = results[0].firstName;
        ln = results[0].lastName;
      }
    
      var ret = { id:id, firstName:fn, lastName:ln, error:''};
      res.status(200).json(results);
    });
//searching users 
router.post('/search', async (req, res, next) =>
{
try{
    const searchedUsers = await User.find({$or:[
    {firstName:{$regex: req.body.key, $options: 'i'}},
    {lastName:{$regex: req.body.key, $options: 'i'}},
    {phone:{$regex: req.body.key, $options: 'i'}},
    {email:{$regex: req.body.key, $options: 'i'}}
    ]})
    res.json(searchedUsers)
}catch(err){
    res.status(400).json({message: err.message })
}
});
module.exports = router
