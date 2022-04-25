const express = require('express');
const Topic = require('../models/topic');
const router = express.Router();

router
    .post('/getAllTopics', async (req, res) => {
        try{
            const topics = Topic.getAllTopics();
            res.send(topics);
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .post('/add', (req, res) => {
        try {
            const topic = Topic.addTopic(req.body);
            res.send({...topic})
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

module.exports = router;