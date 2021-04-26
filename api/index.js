const express = require("express");
const session = require("express-session");
const path = require("path");
const port = 3001;

// routs
const channelRoutes = require("./routes/channelRoutes.js");
const programRoutes = require("./routes/programRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const chanelsPrefix = "/api/v1/channels";
const programsPrefix = "/api/v1/programs";
const userPrefix = "/api/v1/users";

//

// Server setup
const app = express();

// Make sure the server can read the req.body object
app.use(express.json());

app.use(
  session({
    // todo  This should be extacted to its own file, it could be a json-file and it should also be gitignored. 
    secret: "The Radio Listener",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);
app.use(chanelsPrefix, channelRoutes);
app.use(programsPrefix, programRoutes);
app.use(userPrefix, userRoutes);


// Serve static files, makes the frontend files "available" to the backend
app.use(express.static(path.join(__dirname, "../build")));


// Starts the server
app.listen(port, (err) => {
  if (err) {
    console.error("The server could not be started...");
    console.log(err);
    return;
  }
  console.log(`Listening on port ${port}`);
});
