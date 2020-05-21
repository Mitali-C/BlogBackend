const express = require('express');
const { createTag, updateTag, getTags} = require("../controllers/tag");

const router = express.Router();

router.post('/tag',  createTag);
router.put('/tag',  updateTag);
router.get('/tag',  getTags);

module.exports = router;
