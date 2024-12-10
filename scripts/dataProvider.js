const path = require('path');
const fs = require('fs');

const getData = filename => {
	const jsonPath = path.join(__dirname, '../data', `${filename}.json`);
	try {
		const jsonData = fs.readFileSync(jsonPath, "utf8");
		return JSON.parse(jsonData);
	} catch (err) {
		return null;
	}
}

module.exports = {
	getData
};