import $ from "../$";

let services = null;

try {
	services = require('../../common/services/index.js');

	if (typeof services === 'function') {
		services = services();
	}
} catch (e) {
	console.warn("/common/services/index.js not found!");
	services = {};
}

$.$define('services', services);
