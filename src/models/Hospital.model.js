import mongoose from "mongoose";
import User from "./User.model.js";

const Schema = mongoose.Schema;

const hospitalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    users: [
      {
        ref: User,
        required: true,
        type: ObjectId,
      },
    ],
    addresses: {
      province: String,
      district: String,
      sector: String,
      cell: String,
      village: String,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;
