import mongoose from "mongoose";

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
    admin: [String],
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
