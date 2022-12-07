import mongoose from "mongoose";
import User from "./User.model.js";

const Schema = mongoose.Schema;

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
