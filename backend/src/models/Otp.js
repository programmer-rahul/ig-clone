import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;
