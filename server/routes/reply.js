const express = require('express');
const Reply = require('../models/reply');
const router = express.Router();

router
    .post('/getAllReplies', async (req, res) => {
        try{
            const replies = await Reply.getAllReply();
            res.send(replies);
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .post('/add', async (req, res) => {
        try {
            const reply = await Reply.addReply(req.body,req.body.replyText,req.body.userId);
            res.send({...reply})
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .delete('/delete', async (req, res)=> {
        try {
            await Reply.deleteReply(req.body.replyId);
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .put('/edit', async (req, res) => {
        try{
          const topic = await Reply.editReply(req.body);
          res.send({...reply})
        }
        catch (err){
          res.status(401).send({message:err.message})
        }
      })

module.exports = router;