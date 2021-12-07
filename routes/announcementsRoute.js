const express = require('express')
const router = express.Router()
const Announcement = require('../models/announcement')

//getting all announcements 
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find()
        res.json(announcements)
    } catch (err){
        res.satus(500).json({ message : err.message })
    }
})
//create a announcement 
router.post('/', async (req, res) => {
    const announcement = new Announcement({
        timeStamp: req.body.timeStamp,
        date: req.body.date,
        note: req.body.note
    })
    try {
        const newAnnouncement = await announcement.save()
        res.status(201).json(newAnnouncement)
    }catch (err){
        res.status(400).json({message: err.message })
    }
})
//updating a announcement
router.patch('/', async (req, res) => {
    try{
        const updatedAnnouncement = await Announcement.updateOne(
            {_id: req.body._id},
            { $set: {
                            timeStamp: req.body.timeStamp,
                            date: req.body.date,
                            note: req.body.note } }
            )
            const retVal = await Announcement.findOne({_id:req.body._id})
            res.json(retVal)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//deleteing a user
router.delete('/', async (req, res) => {
    try{
    const deletedAnnouncement = await Announcement.deleteOne({_id: req.body._id})
    res.json(deletedAnnouncement)
    }catch(err){
        res.status(400).json({message: err.message })
    }
})


module.exports = router
