//load user model
const User = require("./models/user.js");
const app = require("express").Router();
app.post('/api/login', async (req, res, next) => 
    {
      // incoming: Email, Password
      // outgoing: id, firstName, lastName, error
    
     var error = '';
    
      const { email, password } = req.body;
    
      //const db = client.db();
      //const results = await db.collection('Users').find({Email:email,Password:password}).toArray();
      const results =  await User.find({ Email : email, Password : password });
    
      var id = -1;
      var fn = '';
      var ln = '';
    
      if( results.length > 0 )
      {
        id = results[0]._id;
        fn = results[0].FirstName;
        ln = results[0].LastName;
      }
    
      var ret = { _id:id, firstName:fn, lastName:ln, error:''};
      res.status(200).json(ret);
    });
    
module.exports= app;
