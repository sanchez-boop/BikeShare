//Rent- assigns a user to corresponding bike on bike table
//Take in: Customer Id, Bike Number
//returns success/fail, bike must not already be rented

// bike : {
// 	id : string
// 	serialNumber : string
// 	model : string
// 	dateRented : string
// 	notes : string (100 char limit)
// 	customerID : (account id)
// }

const app = require("express").Router();
app.post('/api/rent', async (req, res, next) => 
	{	
    let todayDate = new Date().toLocaleDateString();

	const {customer_ID, bike_ID} = req.body;
	const db = client.db();

    const result = awaitdb.collection('Bikes').find({id:bike_ID});
    if (result.dateRented === null)
    {
        db.Bikes.updateOne({id: bike_ID}, {$set:{dateRented:todayDate, customerID:customer_ID}});
        var ret = result.dateRented;
        res.status(200).json(ret);
    } else {
        var ret = {Error: "bike already rented"}
        res.status(409).json(ret);  //409 conflict with current state of server?? maybe change status code
    }
});
modules.exports=app;