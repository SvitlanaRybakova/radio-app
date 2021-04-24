const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");



router.get("", programController.getAllPrograms);
router.get("/:programId", programController.getProgramById);
router.get("/categories", programController.getAllCategoriesName)
router.get("/programms-by-category/:categoryId", programController.getProgramsByCategory);


module.exports = router;