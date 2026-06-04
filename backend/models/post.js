import mongoose from "mongoose";

const Schema = mongoose.Schema
const postSchema = new Schema({
  username : {type: String, required: true},
  profilePicture : {type: String, required: true},
  condition : {type: String, required: true}, 
  title: {type: String, required: true}, 
  category: {type: String, required: true},
  location: {type: String, required: true}, 
  date: {type: Date, required: true},
  description: {type: String, required: true},
  comments: [{
    user: {type: String, required: true},
    text: {type: String, required: true},
    profilePicture: {type: String, required: true},
    createdAt: {
      type: Date, 
      default: Date.now
    }
  }], 
  image: {type: String, required: true}
},{
  timestamps: true
});

const Post = mongoose.model("Post", postSchema)

export default Post;