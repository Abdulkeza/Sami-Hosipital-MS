import mongoose from "mongoose";
import Institution from "./Institution.model.js";

const Schema = mongoose.Schema;
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
      default: "Receptionist",
    },
    accessLevel: {
      type: Number,
      required: true,
      default: 100,
      minimum: 0,
      maximum: 100
  },
    isActive: {
      type: String,
      required: true,
      default: false,
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: Institution,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
