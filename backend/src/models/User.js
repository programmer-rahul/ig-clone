import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    refreshToken : {
      type : String,
      default : null,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
