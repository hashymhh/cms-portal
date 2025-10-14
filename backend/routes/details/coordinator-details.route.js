const express = require("express");
const router = express.Router();
const coordinatorDetailsController = require("../../controllers/details/coordinator-details.controller");
const { auth, authorize } = require("../../middlewares/auth.middleware");

// Public routes
router.post("/login", coordinatorDetailsController.loginCoordinator);

// Protected routes (require authentication)
router.use(auth);

// My details route (for logged in coordinator)
router.get("/my-details", coordinatorDetailsController.getMyDetailsController);

// CRUD operations - Admin only for register/delete, coordinators can view/update their own
router.post("/register", authorize(["admin"]), coordinatorDetailsController.registerCoordinator);
router.get("/", authorize(["admin", "coordinator"]), coordinatorDetailsController.getAllCoordinators);
router.get("/:id", authorize(["admin", "coordinator"]), coordinatorDetailsController.getCoordinatorById);
router.put("/:id", authorize(["admin", "coordinator"]), coordinatorDetailsController.updateCoordinator);
router.delete("/:id", authorize(["admin"]), coordinatorDetailsController.deleteCoordinator);

// Branch-specific routes
router.get("/branch/:branchId", authorize(["admin", "coordinator"]), coordinatorDetailsController.getCoordinatorsByBranch);

// Permission management - Admin only
router.put("/:id/permissions", authorize(["admin"]), coordinatorDetailsController.updateCoordinatorPermissions);

module.exports = router;