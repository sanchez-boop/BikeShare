const express = require('express')
const router = express.Router()
const Repair = require('../models/repair')
//jwt auth middleware
const jwt = require('jsonwebtoken');
const auth1 = require('./authenticate')

//getting all repairs 
router.get('/', auth1, async (req, res) => {
    try {
        const repairs = await Repair.find()
        res.json(repairs)
    } catch (err){
        res.status(500).json({ message : err.message })
    }
})

//create a repair
router.post('/', auth1, async (req, res) => {
    const repair = new Repair({
        bikeModel: req.body.bikeModel,
        customerID: req.body.customerID,
        id: req.body.id,
        notes: req.body.notes,
        status: req.body.status,
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    })
    try {
        const newRepair = await repair.save()
        res.status(201).json(newRepair)
    }catch (err){
        res.status(400).json({message: err.message })
    }
})
//updating a repair
router.patch('/', auth1, async (req, res) => {
    try{
        const updatedRepair = await Repair.updateOne(
            {_id: req.body._id},
            { $set: {           bikeModel: req.body.bikeModel,
                                customerID: req.body.customerID,
                                id: req.body.id,
                                notes: req.body.notes,
                                status: req.body.status,
                                email: req.body.email,
                                name: req.body.name,
                                phone:req.body.phone } }
            )
            const retVal = await Repair.findOne({_id:req.body._id})
            res.json(retVal)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//deleteing a user
router.delete('/', auth1, async (req, res) => {
    try{
    const deletedRepair = await Repair.deleteOne({id: req.body.id})
    res.json(deletedRepair)
    }catch(err){
        res.status(400).json({message: err.message })
    }
})
//searching repairs 
router.post('/search',  auth1, async (req, res, next) =>
{
try{
    const searchedRepairs = await Repair.find({$or:[{name:{$regex: req.body.key, $options: 'i'}},
                                                    {bikeModel:{$regex: req.body.key, $options: 'i'}},
                                                    {phone:{$regex: req.body.key, $options: 'i'}}]})
    res.json(searchedRepairs)
}catch(err){
    res.status(400).json({message: err.message })
}
});

module.exports = router
