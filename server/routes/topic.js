const express = require('express');
const Topic = require('../models/topic');
const router = express.Router();

router

    //.get('/:id',async (req, res) => {
    //    let id = req.params.id;
    //})
    .post('/getAllTopics', async (req, res) => {
        try{
            const topics = await Topic.getAllTopics();
            res.send(topics);
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .post('/add', async (req, res) => {
        try {
            const topic = await Topic.addTopic(req.body,req.body.topicText,req.body.userId);
            res.send({...topic})
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .delete('/delete', async (req, res)=> {
        try {
            await Topic.deleteTopic(req.body.topicId);
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .put('/edit', async (req, res) => {
        try{
          const topic = await Topic.editTopic(req.body);
          res.send({...topic})
        }
        catch (err){
          res.status(401).send({message:err.message})
        }
      })

module.exports = router;