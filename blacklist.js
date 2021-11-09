// Blacklist- changes user role to blacklist (drew: planned week of 11/2)
// Take in:
// User ID
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

app.post('/api/blacklist', async (req, res, next) => 
{
    var error = '';
    const badCustomer = req.body;   
    const db = client.db();
    db.Users.updateOne({id:badCustomer}, {$set:{True}});
    const results = awaitdb.collection('Users').find({id:badCustomer}).toArray();
    if (results.blacklist) 
    {
        var ret = results.blacklist;
        res.status(200).json(ret);
    } else {
        var ret = {Error: error}
        res.status(404).json(ret);
    }
});