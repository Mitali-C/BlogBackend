const express = require('express');
const { createPost, updatePost, getPosts, addPostToTag,uploadImage } = require("../controllers/post");

const router = express.Router();

router.post('/post',  createPost);
router.put('/post',  updatePost);
router.get('/post',  getPosts);
router.get('/tag/post',  addPostToTag);
router.post('/upload',  uploadImage);

module.exports = router;
