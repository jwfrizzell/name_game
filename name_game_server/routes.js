const Faces = require("./controllers/faces.js");

module.exports = function(app) {
	app.post("/faces", Faces.getfaces);
	app.post("/faces/isvalid", Faces.validateface);
};
