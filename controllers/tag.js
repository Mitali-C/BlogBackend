const Tag = require('../models/tag');

// Create a tag
exports.createTag = (req,res) => {
  const tag = new Tag(req.body);
  tag.save((err, tag) => {
    if(err){
      return res.status(400).json({status:false, message:"Error in saving the tag", error:err});
    }
    else{
      return res.status(200).json({
        status: true,
        message:'Tag saved successfully!',
        data:tag
      })
    }
  })
}

//Update a tag
exports.updateTag = (req, res) => {
  Tag.findOneAndUpdate({_id:req.body.id}, req.body, {new: true}, function(err, updated_tag)
  {
    if(err)
    {
      return res
        .status(400)
        .json({
          status: false,
          message: 'Error updating the tag.',
          error: err
        })
    }
    res
    .status(200)
    .json({
      status: true,
      message: 'Tag updated successfully!',
      data: updated_tag
    })
  })
}

// get a tag by id or get all tags
exports.getTags = (req, res) => {
  console.log(req.query.id)
  if(req.query.id != undefined)
  {
    console.log(req.query.id)
    Tag.findOne({_id: req.query.id})
    .populate({ path: "posts", populate: { path: "comments" } })
    .exec(function(err, tag)
    {
      if(err)
      {
        return res
          .status(400)
          .json({
            status: false,
            error: 'Error finding the tag'
          })
      }
      else if(!tag)
      {
        return res
          .status(400)
          .json({
            status: false,
            error: 'No tag found with id'
          })
      }
      res
      .status(200)
      .json({
        status: true,
        message: 'Success finding tag',
        tag: tag
      })
    })
  }
  else if(req.query.name !==undefined){
    Tag.find({name:req.query.name})
    .populate({ path: "posts", populate: { path: "comments" } })
      .exec(function(err, tag)
      {
        if(err)
        {
          return res
            .status(400)
            .json({
              status: false,
              error: 'Error getting the tag'
            })
        }
        else if(!tag || tag.length===0)
        {
          return res
            .status(400)
            .json({
              status: false,
              error: 'No tag found'
            })
        }
        res
          .status(200)
          .json({
            status: true,
            message: 'Success finding tag',
            data: tag
          })
      })
  }
  else
  {
    Tag.find({})
    .populate({ path: "posts", populate: { path: "comments" } })
      .exec(function(err, tags)
      {
        if(err)
        {
          return res
            .status(400)
            .json({
              status: false,
              error: 'Error getting the tags'
            })
        }
        else if(!tags)
        {
          return res
            .status(400)
            .json({
              status: false,
              error: 'No tags found'
            })
        }
        res
          .status(200)
          .json({
            status: true,
            message: 'Success finding question',
            data: tags
          })
      })
  }
}