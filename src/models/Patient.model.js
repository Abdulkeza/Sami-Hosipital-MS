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
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      min: 3,
    },
    phone: {
      type: Number,
      required: [true, "Please add a phone number"],
      max: 10,
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
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
