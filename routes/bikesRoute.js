const express = require('express')
const router = express.Router()
const Bike = require('../models/bike')
//jwt auth middleware
const jwt = require('jsonwebtoken');
const auth1 = require('./authenticate')

//getting all bikes 
router.get('/', async (req, res) => {
    try {
        const bikes = await Bike.find()
        res.json(bikes)
    } catch (err){
        res.status(500).json({ message : err.message })
    }
})
//create a bike
router.post('/', auth1, async (req, res) => {
    const bike = new Bike({
        dateRented: req.body.dateRented,
        id: req.body.id,
        model: req.body.model,
        notes: req.body.notes,
        serialNumber: req.body.serialNumber,
        customerID: req.body.customerID,
        availability: req.body.availability,
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    })
    try {
        const newBike = await bike.save()
        res.status(201).json(newBike)
    }catch (err){
        res.status(400).json({message: err.message })
    }
})
//updating a repair
router.patch('/', auth1, async (req, res) => {
    try{
        const updatedBike = await Bike.updateOne(
            {id: req.body.id},
            { $set: {       dateRented: req.body.dateRented,
                            id: req.body.id,
                            model: req.body.model,
                            notes: req.body.notes,
                            serialNumber: req.body.serialNumber,
                            customerID: req.body.customerID,
                            availability: req.body.availability,
                            email: req.body.email,
                            name: req.body.name,
                            phone: req.body.phone } }
            )
            const retVal = await Bike.findOne({id:req.body.id})
            res.json(retVal)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//deleteing a user
router.delete('/', auth1, async (req, res) => {
    try{
    const deletedBike = await Bike.deleteOne({id: req.body.id})
    res.json(deletedBike)
    }catch(err){
        res.status(400).json({message: err.message })
    }
})
//searching bikes
router.post('/search', async (req, res, next) =>
{
try{
    const searchedBikes = await Bike.find({id:{$regex: req.body.key, $options: 'i'}})
    res.json(searchedBikes)
}catch(err){
    res.status(400).json({message: err.message })
}
});
module.exports = router
