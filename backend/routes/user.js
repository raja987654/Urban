const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router
  .route("/users")
  .get(authorize("admin"), getUsers)
  .post(authorize("admin"), createUser);

router
  .route("/users/:id")
  .get(getUser)
  .put(authorize("admin"), updateUser)
  .delete(authorize("admin"), deleteUser);

module.exports = router;
