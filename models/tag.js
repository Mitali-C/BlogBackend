const mongoose = require('mongoose');
Schema = mongoose.Schema

const tagSchema = new mongoose.Schema({
    name: {
      type :String,
      required : true
    },

    posts:[{type: Schema.Types.ObjectId, ref: 'PostModel'}]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("tagModel", tagSchema);