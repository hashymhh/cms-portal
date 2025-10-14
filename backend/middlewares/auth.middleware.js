const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return ApiResponse.unauthorized("Authentication token required").send(
        res
      );
    }

    token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.userId) {
        return ApiResponse.unauthorized("Invalid token format").send(res);
      }

      req.userId = decoded.userId;
      req.role = decoded.role || "unknown";
      req.coordinatorType = decoded.coordinatorType;
      req.branchId = decoded.branchId;
      req.permissions = decoded.permissions;
      req.token = token;
      next();
    } catch (jwtError) {
      console.error("JWT Error:", jwtError);
      return ApiResponse.unauthorized("Invalid or expired token").send(res);
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return ApiResponse.unauthorized("Authentication failed").send(res);
  }
};

// Role-based authorization middleware
const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.role) {
      return ApiResponse.unauthorized("Role information missing").send(res);
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.role)) {
      return ApiResponse.forbidden(
        `Access denied. Required roles: ${allowedRoles.join(", ")}`
      ).send(res);
    }

    next();
  };
};

// Permission-based authorization for coordinators
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.role !== "coordinator") {
      return next(); // Skip permission check for non-coordinators
    }

    if (!req.permissions || !req.permissions[permission]) {
      return ApiResponse.forbidden(
        `Access denied. Required permission: ${permission}`
      ).send(res);
    }

    next();
  };
};

module.exports = { auth, authorize, requirePermission };
