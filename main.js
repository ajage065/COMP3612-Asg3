const express = require("express");
const app = express();
const path = require("path");
const drivers = require("./scripts/drivers.js");
const constructors = require("./scripts/constructors.js");
const results = require("./scripts/results.js");
const races = require("./scripts/races.js");
const circuits = require("./scripts/circuits.js");

circuits.getCircuits(app);
drivers.getDrivers(app);
constructors.getConstructors(app);
races.getRaces(app);
results.getResults(app);


let port = 8080;
app.listen(port, () => {
 console.log("Server running at port= " + port);
}); 