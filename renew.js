// renew: changes date checked out on Bike table to today. 
// return: makes date checked out and id null
// Take in: Bike_ID, Customer_ID
// Return: Success or fail

// bike : {
// 	id : string
// 	serialNumber : string
// 	model : string
// 	dateRented : string
// 	notes : string (100 char limit)
// 	customerID : (account id)
// }

app.post('/api/renew', async (req, res, next) => 
{
    let todayDate = new Date().toLocaleDateString();
	var error = '';
	
	const {customer_ID, bike_ID} = req.body;
	const db = client.db();

    const result = awaitdb.collection('Bikes').find({id:bike_ID});
    if (result.dateRented != null)
    {
        db.Bikes.updateOne({id: bike_ID}, {$set:{dateRented:todayDate}});
        var ret = result.dateRented;
        res.status(200).json(ret);
    } else {
        var ret = {Error: "bike not rented out"}
        res.status(409).json(ret);  //409 conflict with current state of server?? maybe change status code
    }
});