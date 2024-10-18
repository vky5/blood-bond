import mongoose from 'mongoose';
import validator from 'validator';

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter a name']
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required'],
        select: false // Don't include password in queries by default
    },
    confirmPassword: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    // Medical information
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: [true, 'Blood type is required']
    },
    lastDonationDate: {
        type: Date
    },
    medicalCondition: {
        type: String,
        default: 'None' // Optional medical conditions (e.g., diabetes, heart disease)
    },
    // Address information
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: {
            type: String,
            required: [true, 'State is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        },
        postalCode: {
            type: String,
            required: [true, 'Postal code is required']
        }
    },
    // Geolocation for route calculations
    location: {
        type: {
            type: String,
            enum: ['Point'], // GeoJSON type "Point"
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Array of two numbers: [longitude, latitude]
            required: true,
            validate: {
                validator: function(v) {
                    return v.length === 2;
                },
                message: 'Coordinates must have exactly 2 values: longitude and latitude'
            }
        }
    }
});

// Create geospatial index for location to enable queries based on proximity
donorSchema.index({ location: '2dsphere' });

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;
