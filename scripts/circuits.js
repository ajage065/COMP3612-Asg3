const dataProvider = require("./dataProvider.js");
const circuits = dataProvider.getData("circuits");

const getCircuits = app => {
	if (circuits){
		handleCircuits(app);
		handleCircuitsById(app);
	} else app("/", (req, resp) => {resp.json({"error" : "circuits.json not found!"})});
}

const handleCircuits = app => {
	app.get("/api/circuits", (req, resp) => {resp.json(circuits);});
}

const handleCircuitsById = app => {
	app.get("/api/circuits/:id", (req, resp) => {
		let id = req.params.id;
		const match = circuits.find(c => c.circuitId == id);
		if (match) resp.json(match);
		else resp.json({"message" : `No circuit found with id ${id}.`});
	});
}

module.exports = {
	getCircuits
}