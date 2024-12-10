const dataProvider = require("./dataProvider.js");
const results = require("./results.js");
const drivers = dataProvider.getData("drivers");

const getDrivers = app => {
	if (drivers){
		handleDrivers(app);
		handleDriversByRef(app);
		handleDriverResults(app);
	} else app("/", (req, resp) => {resp.json({"error" : "drivers.json not found!"})});
}

const handleDrivers = app => {
	app.get("/api/drivers", (req, resp) => {resp.json(drivers);});
}

const handleDriversByRef = app => {
	app.get("/api/drivers/:ref", (req, resp) => {
		let reference = req.params.ref.toLowerCase();
		const match = drivers.find(d => d.driverRef == reference);
		if (match) resp.json(match);
		else resp.json({"message" : `No matching driver for provided reference: ${reference}.`});
	});
}

const handleDriverResults = app => {
	app.get("/api/driverResults/:ref/:year", (req, resp) => {
		if (results.data) {
			let reference = req.params.ref.toLowerCase();
			let year = req.params.year;
			const matches = results.data.filter(r => (r.driver.ref == reference && r.race.year == year));
			if (matches.length > 0) resp.json(matches);
			else resp.json({"message" : `No results found for ${reference} in ${year}.`});
		} else resp.json({"error" : "results.json not found!"});
	});
}

module.exports = {
	getDrivers
}