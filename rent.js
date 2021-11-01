//rough draft, untested with database
//Rent- assigns a user to corresponding bike on bike table
app.post('/api/rent', async (req, res, next) => 
	{
	//Take in:
	//Customer Id
	//Bike Number
	//Return:
	//Date checked out
	let todayDate = new Date().toLocaleDateString();
	var error = '';
	
	const {CustomerID, BikeNumber} = req.body;
	const db = client.db();
	//is bike already checked out? discuss how this error is handled. if bike is not checked out, is 
	//field checkedoutto null?? use if statement for this. return prev date if already checked out, 	toehrwise todays date
	db.Bikes.updateOne({Bike_Number: BikeNumber}, {$set:{Date_checked_out:todayDate}});
	const result = awaitdb.collection('Bikes').find({BikeNumber});
	
	var ret = result.Date_checked_out;
	res.status(200).json(ret);
	}