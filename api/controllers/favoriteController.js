const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../app/RadioKanaler.db"));

const getFavoriteProgrammsById = (req, res) => {

  let query = /*sql*/` SELECT * FROM favoriteList WHERE userId = $userId `;
  let params = { $userId: req.params.userId }

  db.all(query, params, [], (err, list) => {
    if (list.length > 0) {
      console.log("Runs after the query");
      res.json(list);
    }
    if (err) {
      console.log("NEW ERROR: ", err);
    }
  });
};

const addNewProgramm = (req, res) => {
  let query = /*sql*/
    `INSERT INTO favoriteList (${Object.keys(req.body).join(
      ", "
    )}) VALUES (${Object.keys(req.body)
      .map((k) => "$" + k)
      .join(", ")})`;

  let params = {};
  for (let key in req.body) {
    params["$" + key] = req.body[key];
  }

  db.run(query, params, function (err, result) {
    if (!err) {
      res.json({ success: "Program added successfully", lastID: this.lastID });
    } else {
      console.log("NEW ERROR", err);
      res.json({ success: "Program NOT added " });
    }
    
  });
}

const deleteProgramFromFavoriteList = (req, res) => {
  let query = `DELETE FROM favoriteList WHERE favoriteListId = $favoriteListId`;
  let params = { $favoriteListId: req.params.favoriteListId }

  db.run(query, params, function (err) {
    if (err) {
      console.log("NEW ERROR", err);
    }
    res.json({ success: "Program has been deleted", changes: this.changes });
  });
}

module.exports = {
  getFavoriteProgrammsById,
  addNewProgramm,
  deleteProgramFromFavoriteList,
}