const { Router } = require("express");
const userController = require("../controller/user.controller");
const router = Router();

// URL START WITH : /auth

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
