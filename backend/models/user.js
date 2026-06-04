import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    required: true,
    type: String, 
    unique: true
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  }, 
  profilePicture: {
    type: String, 
    required: true
  }
})

const User = mongoose.model("User", userSchema);

export default User