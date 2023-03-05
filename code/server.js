const express = require("express");
const app = express();
const port = 5000;
require("./bartapis")(app);
// require("./api")(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  
  app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
  });
  