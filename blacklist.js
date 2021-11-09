// Blacklist- changes user role to blacklist
// INPUT: id
//return: success status (200) or failure status (404) w/support for a fail message

// account : {
// 	id : string
// 	email : string
// 	password : hashed string
// 	name : string
// 	phone : string
// 	waiver : bool
// 	blacklist : bool
// 	role : string
// }
const app = require("express").Router();
app.post('/api/blacklist', async (req, res, next) => 
{
    const badCustomer = req.body;   
    const db = client.db();
    db.Users.updateOne({id:badCustomer}, {$set:{True}});
    const result = awaitdb.collection('Users').find({id:badCustomer})
    if (results.blacklist) 
    {
        var ret = results.blacklist;
        res.status(200).json(ret);
    } else {
        res.status(404).json("unable to adjust blacklist status");
    }
});
modules.exports=app;