import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
      required: true
    },
    lastName: {
      type: String,
      min: 3,
      required: true
    },
    email: {
      type: String,
      unique: true,
      min: 3,
      max: 20,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    //this should be auto generated and must be sent to the user email
    password: {
      type: String,
      required: true,
      min: 3,
      max: 10,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    accessLevel: {
      type: Number,
      required: true,
      default: 10,
      minimum: 0,
      maximum: 10
  },
    isActive: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
