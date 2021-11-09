// Start repair:- adds an entry into the repair table with info
// Take in: customerID, status, notes, bikeModel
// Return: Success- repair statres

// Repair : {
// 	id : string
// 	bikeModel : string
// 	notes: string
// 	status : string (100 char limit)
// 	customerID : (account id)
// }

const app = require("express").Router();
app.post('/api/startRepair', async (req, res, next) => 
{
    var error=''
	const {customer_id, repairStatus, repairNotes, bike_model} = req.body;
    const newRepair = {customerID: customer_id, status:repairStatus, notes:repairNotes, bikeModel:bike_model};
	try {
        const db = client.db();
        const result = db.collection('Repair').insertOne({newRepair});
    }
    catch(e) {
        error = e.toString();
    }
    if (error === "")
    {
        res.status(200).json("repair entry created");
    } else {
        res.status(409).json(error);  // not sure about the error status 
    }
});
modules.exports=app;