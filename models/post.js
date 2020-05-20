const mongoose = require('mongoose');
Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
    content: {
      type :String,
      required : true
    },

    title: {
      type :String,
      required : true
    },
    comments:[{type: Schema.Types.ObjectId, ref: 'CommentModel'}]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("PostModel", postSchema);