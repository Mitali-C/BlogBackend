const express = require('express');
const { addComment, addCommentToPost} = require("../controllers/comment");

const router = express.Router();

router.post('/comment',  addComment);
router.post('/post/comment',  addCommentToPost);

module.exports = router;
