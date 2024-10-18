import mongoose from "mongoose";
import validator from "validator";

// Create the Blood Bank schema
const BloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Blood bank name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validate for a 10-digit phone number
      },
      message: "Phone number must be 10 digits",
    },
  },
  address: {
    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true,
    },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // Specify that this is a point
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  bloodStock: {
    "A+": { type: Number, default: 0 },
    "A-": { type: Number, default: 0 },
    "B+": { type: Number, default: 0 },
    "B-": { type: Number, default: 0 },
    "AB+": { type: Number, default: 0 },
    "AB-": { type: Number, default: 0 },
    "O+": { type: Number, default: 0 },
    "O-": { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a 2dsphere index on the location field
BloodBankSchema.index({ location: "2dsphere" });

// Create the Blood Bank model
const BloodBankModel = mongoose.model("BloodBank", BloodBankSchema);

export default BloodBankModel;
