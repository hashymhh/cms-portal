const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const coordinatorDetailsSchema = new mongoose.Schema(
  {
    employeeId: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    dob: {
      type: Date,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    // Coordinator specific fields
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    coordinatorType: {
      type: String,
      enum: ["academic", "placement", "event", "exam"],
      required: true,
    },
    permissions: {
      canManageTimetables: {
        type: Boolean,
        default: true,
      },
      canManageExams: {
        type: Boolean,
        default: true,
      },
      canManageNotices: {
        type: Boolean,
        default: true,
      },
      canManageMaterials: {
        type: Boolean,
        default: true,
      },
      canViewReports: {
        type: Boolean,
        default: true,
      },
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

coordinatorDetailsSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const coordinatorDetails = mongoose.model("CoordinatorDetail", coordinatorDetailsSchema);

module.exports = coordinatorDetails;