import $ from "../$";

let models = null;

try {
	models = require('../../common/models/index.js');

	if (typeof models === 'function') {
		models = models();
	}
} catch (e) {
	console.warn("/common/models/index.js not found!");
	models = {};
}

$.$define('models', models);
