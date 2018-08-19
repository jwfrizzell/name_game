const Faces = require("../models/faces.js");

exports.getfaces = async function(req, res) {
	res.send({ data: await Faces.getFaces() });
};

exports.validateface = async function(req, res, next) {
	res.send({ isValid: await Faces.validateFace(req.body) });
};
