import mongoose from "mongoose";
import Patient from "./Patient.model.js";
import Institution from "./Institution.model.js";

const Schema = mongoose.Schema;

const diagnosisSchema = mongoose.Schema(
  {
    Patient: {
      type: Schema.Types.ObjectId,
      ref: Patient,
      required: true,
      unique: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    disease: {
    type: String,
    default: "None"
    },
    medecine: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

export default Diagnosis;
