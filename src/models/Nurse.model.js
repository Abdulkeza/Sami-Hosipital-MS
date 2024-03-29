import mongoose from "mongoose";
import User from "./User.model.js";
import Institution from "./Institution.model.js";

const Schema = mongoose.Schema;

const nurseSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
      unique: true,
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

const Nurse = mongoose.model("Nurse", nurseSchema);

export default Nurse;
