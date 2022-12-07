import mongoose from "mongoose";
import User from "./User.model.js";
import Institution from "./Institution.model.js";

const Schema = mongoose.Schema;

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
      unique: true,
    },
    speciality: {
      type: String,
      required: true,
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

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
