const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");



router.get("", programController.getAllPrograms);
router.get("/:programId", programController.getProgramById);
router.get("/categories/:categoryId", programController.getAllCategoriesName)


module.exports = router;