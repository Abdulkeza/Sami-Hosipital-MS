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
    phone: {
      type: Number,
    },
    addresses: {
      province: String,
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
    },
    patientId: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
