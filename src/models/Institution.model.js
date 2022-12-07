import mongoose from "mongoose";
import User from "./User.model.js";

const Schema = mongoose.Schema;

const InstitutionSchema = mongoose.Schema(
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
        type: Schema.Types.ObjectId,
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
    type: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Institution = mongoose.model("Institution", InstitutionSchema);

export default Institution;
