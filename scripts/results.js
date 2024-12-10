const dataProvider = require("./dataProvider.js");
const data = dataProvider.getData("results");

const getResults = app => {
	if (data){
		handleResultsByRace(app);
		handleResultsByYear(app);
	} else app("/", (req, resp) => {resp.json({"error" : "results.json not found!"})});
}

const handleResultsByRace = app => {
	app.get("/api/results/race/:id", (req, resp) => {
		let id = req.params.id;
		const matches = data.filter(el => el.race.id == id);
		if (matches.length > 0) resp.json(matches);
		else resp.json({"message" : `No results found for race id ${id}.`});
	});
}

const handleResultsByYear = app => {
	app.get("/api/results/season/:year", (req, resp) => {
		let year = req.params.year;
		const matches = data.filter(el => el.race.year == year);
		if (matches.length > 0) resp.json(matches);
		else resp.json({"message" : `No results found for the ${year} season.`});
	});
}

module.exports = {
	data, getResults
}