import mongoose from "mongoose";

import Institution from "./Institution.model.js";

const Schema = mongoose.Schema;

const patientSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
    },
    gender: {
      type: String,
    },
    phone: {
      type: Number,
    },
    addresses: {
      district: String,
      sector: String,
      cell: String,
      village: String,
    },
    status: {
      type: String,
      required: true,
      default: "alive",
    },
    nationalId: {
      type: String,
      // unique: true,
    },
    transfered: {
      type: Boolean,
      default: false,
    },
    // where patient were transfered  !!!!
    patientId: {
      type: Number,
      min: 0,
      unique: true,
    },
    referralHospital: [String],
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

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
