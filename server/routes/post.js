const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router
    .post('/getAllPosts', async (req, res) => {
        try{
            const posts = await Post.getAllPosts();
            res.send(posts);
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .post('/add', async (req, res) => {
        try {
            const post = await Post.addPost(req.body,req.body.postText,req.body.userId);
            res.send({...post})
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .delete('/delete', async (req, res)=> {
        try {
            await Post.deletePost(req.body.postId);
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })
    .put('/edit', async (req, res) => {
        try{
          const post = await Post.editPost(req.body);
          res.send({...post})
        }
        catch (err){
          res.status(401).send({message:err.message})
        }
      })

module.exports = router;