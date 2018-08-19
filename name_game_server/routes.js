const Faces = require("./controllers/faces.js");

module.exports = function(app) {
	app.get("/faces", Faces.getfaces);
	app.post("/faces/isvalid", Faces.validateface);
};
