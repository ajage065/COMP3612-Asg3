const dataProvider = require("./dataProvider.js");
const results = require("./results.js");
const constructors = dataProvider.getData("constructors");

const getConstructors = app => {
	if (constructors){
		handleConstructors(app);
		handleConstructorsByRef(app);
		handleConstructorResults(app);
	} else app("/", (req, resp) => {resp.json({"error" : "constructors.json not found!"})});
}

const handleConstructors = app => {
	app.get("/api/constructors", (req, resp) => {resp.json(constructors)});
}

const handleConstructorsByRef = app => {
	app.get("/api/constructors/:ref", (req, resp) => {
		let reference = req.params.ref.toLowerCase();
		const match = constructors.find(d => d.constructorRef == reference);
		if (match) resp.json(match);
		else resp.json({"message" : `No matching constructor for provided reference: ${reference}.`});
	});
}

const handleConstructorResults = app => {
	app.get("/api/constructorResults/:ref/:year", (req, resp) => {
		if (results.data){
			let reference = req.params.ref.toLowerCase();
			let year = req.params.year;
			const matches = results.data.filter(r => (r.constructor.ref == reference && r.race.year == year));
			if (matches.length > 0) resp.json(matches);
			else resp.json({"message" : `No results found for ${reference} in ${year}.`});
		} else resp.json({"error" : "results.json not found!"});
	});
}

module.exports = {
	getConstructors
}