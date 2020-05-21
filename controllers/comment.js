const Comment = require('../models/comment');
const Post = require('../models/post');

// Add a comment
exports.addComment = (req,res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if(err){
      return res.status(400).json({status:false, message:"Error in adding the comment", error:err});
    }
    else{
      return res.status(200).json({
        status: true,
        message:'Comment posted successfully!',
        data:comment
      })
    }
  })
}
// Add comment to the post
exports.addCommentToPost = (req, res) => {
  Post.findOne({_id: req.body.postId}, function(err, post)
  {
    if(err | post == undefined)
    {
      return res
        .status(400)
        .json({
            status: false,
            message: 'Error finding the post'
        })
    }

      
    if(post.comments)
    {
        post.comments.push(req.body.commentId)
    }
    else
    {
      post.comments = [req.body.commentId]
    }

    post.save(function(err, updated_post)
    {
        res
        .status(200)
        .json({
            status: true,
            message: 'Success adding comment to post',
            data:updated_post
        })
    })
      
  })
}