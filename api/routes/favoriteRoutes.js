const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

router.get("/:userId", favoriteController.getFavoriteProgrammsById);
router.post("/add-new-favorite-programm", favoriteController.addNewProgramm);
router.delete("/favorite/:favoriteListId", favoriteController.deleteProgramFromFavoriteList);

module.exports = router;