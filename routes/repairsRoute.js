const express = require('express')
const router = express.Router()
const Repair = require('../models/repair')

//getting all repairs 
router.get('/', async (req, res) => {
    try {
        const repairs = await Repair.find()
        res.json(repairs)
    } catch (err){
        res.satus(500).json({ message : err.message })
    }
})

//create a repair
router.post('/', async (req, res) => {
    const repair = new Repair({
        bikeModel: req.body.bikeModel,
        customerID: req.body.customerID,
        id: req.body.id,
        notes: req.body.notes,
        status: req.body.status
    })
    try {
        const newRepair = await repair.save()
        res.status(201).json(newRepair)
    }catch (err){
        res.status(400).json({message: err.message })
    }
})
//updating a repair
router.patch('/', async (req, res) => {
    try{
        const updatedRepair = await Repair.updateOne(
            {id: req.body.id},
            { $set: {           bikeModel: req.body.bikeModel,
                                customerID: req.body.customerID,
                                id: req.body.id,
                                notes: req.body.notes,
                                status: req.body.status } }
            )
            res.json(updatedRepair)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//deleteing a user
router.delete('/', async (req, res) => {
    try{
    const deletedRepair = await Repair.deleteOne({id: req.body.id})
    res.json(deletedRepair)
    }catch(err){
        res.status(400).json({message: err.message })
    }
})


module.exports = router