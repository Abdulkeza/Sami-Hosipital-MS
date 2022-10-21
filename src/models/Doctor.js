import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
    {
        firstName: {
          type: String,
          required: true,
          min: 3,
          max: 30,
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 30,
          },
        email: {
          type: String,
          required: [true, 'Please add a email'],
          unique: true,
          min: 3,
          max: 20,
        },
        phone: {
            type: Number,
            required: [true, 'Please add a phone number'],
            max: 10,
          },
  //this should be auto generated and must be sent to the user email
        password: {
          type: String,
          required: true,
          min: 3,
          max: 30,
        },
        role: {
            type: String,
            required: true,
            max: 10,
          },
        date: {
          type: Date,
          default: Date.now,
        },
      },
      {
        timestamps: true,
      }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;