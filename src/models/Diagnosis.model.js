import mongoose from "mongoose";
import Patient from "./Patient.model.js";
import User from "./User.model.js";

const Schema = mongoose.Schema;

const diagnosisSchema = mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: Patient,
      required: true,
      unique: true,
    },
    treatment: [
      {
        symptoms: String,
        disease: String,
        medecine: String,
        examiner: {
          type: Schema.Types.ObjectId,
          ref: User,
        },
        status: {
          type: String,
          default: "alive",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

export default Diagnosis;
