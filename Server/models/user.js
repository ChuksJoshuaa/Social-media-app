import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    maxLength: 50,
    minlength: 3,
  },
  mobile: {
    type: String,
    required: [true, "please provide number"],
    maxLength: 50,
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
  },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
