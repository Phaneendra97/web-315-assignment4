const axios = require("axios");

module.exports = function (app) {
  const bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
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

  app.get("/stations", (req, apiResponse) => {
    axios
      .get(
        "https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
      )

      // Show response data
      .then((res) => {
        apiResponse.send({
          data: res.data.root.stations,
        });
      })
      .catch((err) => {
        console.log(err);
        apiResponse.status(200);
        apiResponse.send({
          error: JSON.stringify(err),
        });
      });
  });

  app.get("/trips/source/:srcaddr/dest/:destaddr", function (req, apiResponse) {
    var source = req.params["srcaddr"];
    var destination = req.params["destaddr"];
    console.log(source);
    console.log(destination);
    const url = "https://api.bart.gov/api/sched.aspx?cmd=depart&orig=" +source+"&dest="+destination+"&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1&json=y"
    console.log(url);
    axios
      .get(
        url
      )

      // Show response data
      .then((res) => {
        console.log(res.data);
        apiResponse.send({
          trip: res.data.root,
        });
      })
      .catch((err) => {
        console.log(err);
        apiResponse.status(200);
        apiResponse.send({
          error: JSON.stringify(err),
        });
      });
  });

  app.get("/station/source/:source", function (req, apiResponse) {
    var source = req.params["source"];
    axios
      .get(
        "https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=" +
          source +
          "&key=MW9S-E7SL-26DU-VV8V&json=y"
      )

      // Show response data
      .then((res) => {
        apiResponse.send({
          station: res.data.root.stations.station,
        });
      })
      .catch((err) => {
        console.log(err);
        apiResponse.status(200);
        apiResponse.send({
          error: JSON.stringify(err),
        });
      });
  });
};
