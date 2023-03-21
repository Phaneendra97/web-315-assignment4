const https = require("https");
const xml2js = require("xml2js");

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
    const url =
      "https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V";

    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
         
          // parse response and add child elements
          xml2js.parseString(data, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              // Convert the JavaScript object to JSON
              apiResponse.status(200);
              apiResponse.send({
                data: result,
              });
            }
          });
        });
      })
      .on("error", (err) => {
        console.error(err);
      });
  });

  app.get("/station/source/:source", function (req, apiResponse) {
    var source = req.params["source"];
    const url =
      "https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=" +
      source +
      "&key=MW9S-E7SL-26DU-VV8V";
      https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          // create XML root element

          // parse response and add child elements
          xml2js.parseString(data, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              // Convert the JavaScript object to JSON
              if(result.root && result.root.stations &&  result.root.stations[0] && result.root.stations[0].station){
                apiResponse.status(200);
                apiResponse.send({
                  station: result.root.stations[0].station,
                });
              }else{
                apiResponse.status(400);
                apiResponse.send({
                  message: "bad request",
                });
              }
            }
          });
        });
      })
      .on("error", (err) => {
        console.error(err);
      });
  });

  app.get("/trips/source/:srcaddr/dest/:destaddr", function (req, apiResponse) {
    var source = req.params["srcaddr"];
    var destination = req.params["destaddr"];
    const url =
    "https://api.bart.gov/api/sched.aspx?cmd=depart&orig=" +
    source +
    "&dest=" +
    destination +
    "&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1";
      https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          // create XML root element

          // parse response and add child elements
          xml2js.parseString(data, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              // Convert the JavaScript object to JSON
              apiResponse.status(200);
              apiResponse.send({
                trip: result.root,
              });
            }
          });
        });
      })
      .on("error", (err) => {
        console.error(err);
      });
  });
};
