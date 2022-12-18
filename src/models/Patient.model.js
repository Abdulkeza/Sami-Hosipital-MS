import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
