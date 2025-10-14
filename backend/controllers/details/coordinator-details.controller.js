const coordinatorDetails = require("../../models/details/coordinator-details.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiResponse = require("../../utils/ApiResponse");

// Helper function to exclude password from response
const excludePassword = (coordinator) => {
  const { password, ...coordinatorWithoutPassword } = coordinator.toObject();
  return coordinatorWithoutPassword;
};

// Register Coordinator
const registerCoordinator = async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      country,
      gender,
      dob,
      designation,
      joiningDate,
      salary,
      branchId,
      coordinatorType,
      permissions,
      emergencyContact,
      bloodGroup,
      password,
    } = req.body;

    // Check if coordinator already exists
    const existingCoordinator = await coordinatorDetails.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingCoordinator) {
      return ApiResponse.badRequest(
        "Coordinator with this email or employee ID already exists"
      ).send(res);
    }

    const newCoordinator = new coordinatorDetails({
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      country,
      gender,
      dob,
      designation,
      joiningDate,
      salary,
      branchId,
      coordinatorType,
      permissions,
      emergencyContact,
      bloodGroup,
      password,
    });

    await newCoordinator.save();

    return ApiResponse.created(
      "Coordinator registered successfully",
      excludePassword(newCoordinator)
    ).send(res);
  } catch (error) {
    console.error("Register coordinator error:", error);
    return ApiResponse.internalServerError(
      "Failed to register coordinator"
    ).send(res);
  }
};

// Login Coordinator
const loginCoordinator = async (req, res) => {
  try {
    const { email, password } = req.body;

    const coordinator = await coordinatorDetails
      .findOne({ email })
      .populate("branchId");

    if (!coordinator) {
      return ApiResponse.badRequest("Invalid email or password").send(res);
    }

    if (coordinator.status !== "active") {
      return ApiResponse.unauthorized("Account is inactive").send(res);
    }

    const isPasswordValid = await bcrypt.compare(password, coordinator.password);

    if (!isPasswordValid) {
      return ApiResponse.badRequest("Invalid email or password").send(res);
    }

    const token = jwt.sign(
      { 
        userId: coordinator._id,
        role: "coordinator",
        coordinatorType: coordinator.coordinatorType,
        branchId: coordinator.branchId._id,
        permissions: coordinator.permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return ApiResponse.success(
      {
        coordinator: excludePassword(coordinator),
        token,
      },
      "Login successful"
    ).send(res);
  } catch (error) {
    console.error("Login coordinator error:", error);
    return ApiResponse.internalServerError("Login failed").send(res);
  }
};

// Get All Coordinators
const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await coordinatorDetails
      .find()
      .populate("branchId")
      .select("-password");

    return ApiResponse.success(
      "Coordinators retrieved successfully",
      coordinators
    ).send(res);
  } catch (error) {
    console.error("Get all coordinators error:", error);
    return ApiResponse.internalServerError(
      "Failed to retrieve coordinators"
    ).send(res);
  }
};

// Get Coordinator by ID
const getCoordinatorById = async (req, res) => {
  try {
    const { id } = req.params;

    const coordinator = await coordinatorDetails
      .findById(id)
      .populate("branchId")
      .select("-password");

    if (!coordinator) {
      return ApiResponse.notFound("Coordinator not found").send(res);
    }

    return ApiResponse.success(
      "Coordinator retrieved successfully",
      coordinator
    ).send(res);
  } catch (error) {
    console.error("Get coordinator by ID error:", error);
    return ApiResponse.internalServerError(
      "Failed to retrieve coordinator"
    ).send(res);
  }
};

// Update Coordinator
const updateCoordinator = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Remove password from updateData if it's empty
    if (!updateData.password) {
      delete updateData.password;
    } else {
      // Hash the new password
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedCoordinator = await coordinatorDetails
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("branchId")
      .select("-password");

    if (!updatedCoordinator) {
      return ApiResponse.notFound("Coordinator not found").send(res);
    }

    return ApiResponse.success(
      "Coordinator updated successfully",
      updatedCoordinator
    ).send(res);
  } catch (error) {
    console.error("Update coordinator error:", error);
    return ApiResponse.internalServerError(
      "Failed to update coordinator"
    ).send(res);
  }
};

// Delete Coordinator
const deleteCoordinator = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCoordinator = await coordinatorDetails.findByIdAndDelete(id);

    if (!deletedCoordinator) {
      return ApiResponse.notFound("Coordinator not found").send(res);
    }

    return ApiResponse.success("Coordinator deleted successfully").send(res);
  } catch (error) {
    console.error("Delete coordinator error:", error);
    return ApiResponse.internalServerError(
      "Failed to delete coordinator"
    ).send(res);
  }
};

// Get Coordinators by Branch
const getCoordinatorsByBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    const coordinators = await coordinatorDetails
      .find({ branchId })
      .populate("branchId")
      .select("-password");

    return ApiResponse.success(
      "Branch coordinators retrieved successfully",
      coordinators
    ).send(res);
  } catch (error) {
    console.error("Get coordinators by branch error:", error);
    return ApiResponse.internalServerError(
      "Failed to retrieve branch coordinators"
    ).send(res);
  }
};

// Get My Details (for logged in coordinator)
const getMyDetailsController = async (req, res) => {
  try {
    const coordinatorId = req.userId;

    const coordinator = await coordinatorDetails
      .findById(coordinatorId)
      .populate("branchId")
      .select("-password");

    if (!coordinator) {
      return ApiResponse.notFound("Coordinator not found").send(res);
    }

    return ApiResponse.success(
      "Coordinator details retrieved successfully",
      coordinator
    ).send(res);
  } catch (error) {
    console.error("Get my coordinator details error:", error);
    return ApiResponse.internalServerError(
      "Failed to retrieve coordinator details"
    ).send(res);
  }
};

// Update Coordinator Permissions
const updateCoordinatorPermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    const coordinator = await coordinatorDetails
      .findByIdAndUpdate(
        id,
        { permissions },
        { new: true }
      )
      .populate("branchId")
      .select("-password");

    if (!coordinator) {
      return ApiResponse.notFound("Coordinator not found").send(res);
    }

    return ApiResponse.success(
      "Coordinator permissions updated successfully",
      coordinator
    ).send(res);
  } catch (error) {
    console.error("Update coordinator permissions error:", error);
    return ApiResponse.internalServerError(
      "Failed to update coordinator permissions"
    ).send(res);
  }
};

module.exports = {
  registerCoordinator,
  loginCoordinator,
  getAllCoordinators,
  getCoordinatorById,
  updateCoordinator,
  deleteCoordinator,
  getCoordinatorsByBranch,
  updateCoordinatorPermissions,
  getMyDetailsController,
};