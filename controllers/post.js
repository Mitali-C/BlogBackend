const Post = require('../models/post');
const Tag = require('../models/tag');
const cloudinary = require('cloudinary');
const _ = require('underscore');
const Q = require('q');

// Create a post
exports.createPost = (req,res) => {
  const post = new Post(req.body);
  post.save((err, post) => {
    if(err){
      return res.status(400).json({status:false, message:"Error in saving the post", error:err});
    }
    else{
      Tag.findOne({name: req.body.tag}, function(err, tag)
      {
        if(err | tag == undefined)
        {
          return res
            .status(400)
            .json({
                status: false,
                message: 'Error finding the tag'
            })
        }

          
        if(tag.posts)
        {
            tag.posts.push(post._id)
        }
        else
        {
          tag.posts = [post._id]
        }

        tag.save(function(err, updated_tag)
        {
          res
          .status(200)
          .json({
              status: true,
              message: 'Success adding post to tag',
              data:updated_tag
          })
        })
          
      })
    }
  })
}

//Update a post
exports.updatePost = (req, res) => {
  Post.findOneAndUpdate({_id:req.body.id}, req.body, {new: true}, function(err, updated_post)
  {
    if(err)
    {
      return res
        .status(400)
        .json({
          status: false,
          message: 'Error updating the post.',
          error: err
        })
    }
    res
    .status(200)
    .json({
      status: true,
      message: 'Post updated successfully!',
      data: updated_post
    })
  })
}

// get a post by id or get all posts
exports.getPosts = (req, res) => {
  if(typeof(req.query.id) != "undefined")
  {
    console.log(req.query.id)
    Post.findOne({_id: req.query.id})
    .populate('comments')
    .exec(function(err, post)
    {
      if(err)
      {
        return res
          .status(400)
          .json({
            status: false,
            message: 'Error finding the post'
          })
      }
      else if(!post)
      {
        return res
          .status(400)
          .json({
            status: false,
            message: 'No post found with id'
          })
      }
      res
      .status(200)
      .json({
        status: true,
        message: 'Success finding post',
        data: post
      })
    })
  }
  else
  {
    Post.find({})
      .populate('comments')
      .exec(function(err, posts)
      {
        if(err)
        {
          return res
            .status(400)
            .json({
              status: false,
              message: 'Error getting the posts'
            })
        }
        else if(!posts)
        {
          return res
            .status(400)
            .json({
              status: false,
              message: 'No posts found'
            })
        }
        res
          .status(200)
          .json({
            status: true,
            message: 'Success finding question',
            posts: posts
          })
      })
  }
}

// Add the post to a particular tag
exports.addPostToTag = (req, res) => {
  Tag.findOne({_id: req.body.tagId}, function(err, tag)
  {
    if(err | tag == undefined)
    {
      return res
        .status(400)
        .json({
            status: false,
            message: 'Error finding the tag'
        })
    }

      
    if(tag.posts)
    {
        tag.posts.push(req.body.postId)
    }
    else
    {
      tag.posts = [req.body.postId]
    }

    tag.save(function(err, updated_tag)
    {
      res
      .status(200)
      .json({
          status: true,
          message: 'Success adding post to tag',
          data:updated_tag
      })
    })
      
  })
}

// upload image
exports.uploadImage = (req,res) => {
  cloudinary.config=({
    cloud_name:"blog-mc",
    api_key:"999951464771958",
    api_secret:"MRUzQlG_ANeEvBeLzJP0cPT3zo4"
  });

  new Q.Promise((resolve,reject)=>{
    cloudinary.v2.uploader.upload(req.file,(err, res)=>{
      if(err){
        console.log("Cloudinary error:",err)
        reject(err);
      }
      else{
        console.log("Cloudinary response:",res);
        return res.status(200).json({"url":resolve(res.url)})
      }
    })
  })
}