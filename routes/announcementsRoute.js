const express = require('express')
const router = express.Router()
const Announcement = require('../models/announcement')
//jwt auth middleware
const jwt = require('jsonwebtoken');
const auth1 = require('./authenticate')

//getting all announcements 
router.get('/', auth1, async (req, res) => {
    try {
        const announcements = await Announcement.find()
        res.json(announcements)
    } catch (err){
        res.status(500).json({ message : err.message })
    }
})
//create a announcement 
router.post('/', auth1, async (req, res) => {
    const announcement = new Announcement({
        id: req.body.id,
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
router.patch('/', auth1, async (req, res) => {
    try{
        const updatedAnnouncement = await Announcement.updateOne(
            {id: req.body.id},
            { $set: {       id: req.body.id,
                            timeStamp: req.body.timeStamp,
                            date: req.body.date,
                            note: req.body.note } }
            )
            const retVal = await Announcement.findOne({id:req.body.id})
            res.json(retVal)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//deleteing a user
router.delete('/', auth1, async (req, res) => {
    try{
    const deletedAnnouncement = await Announcement.deleteOne({id: req.body.id})
    res.json(deletedAnnouncement)
    }catch(err){
        res.status(400).json({message: err.message })
    }
})


module.exports = router
