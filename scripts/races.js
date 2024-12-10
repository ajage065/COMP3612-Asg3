const dataProvider = require("./dataProvider.js");
const races = dataProvider.getData("races");

const getRaces = app => {
	if (races){
		handleRacesById(app);
		handleRacesByYear(app);
	} else app("/", (req, resp) => {resp.json({"error" : "races.json not found!"})});
}

const handleRacesById = app => {
	app.get("/api/races/id/:id", (req, resp) => {
		let id = req.params.id;
		const match = races.find(r => r.id == id);
		if (match) resp.json(match);
		else resp.json({"message" : `No race found with id ${id}.`});
	});
}

const handleRacesByYear = app => {
	app.get("/api/races/season/:year", (req, resp) => {
		let year = req.params.year;
		const matches = races.filter(r => r.year == year);
		if (matches.length > 0) resp.json(matches);
		else resp.json({"message" : `No races found for the ${year} season.`});
	});
}

module.exports = {
	getRaces
}