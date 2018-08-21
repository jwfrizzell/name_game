const assert = require("assert");
const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../server.js");

describe("/POST Faces", () => {
	it("should retrieve random list of users", done => {
		chai.request(server)
			.post("/faces")
			.send({ size: 6 })
			.end((err, res) => {
				res.should.have.status(200);
				res.header["content-type"].should.be.eq(
					"application/json; charset=utf-8"
				);
				res.body.data.should.be.a("object");

				res.body.data.images.should.be.a("array");
				res.body.data.images.length.should.be.eq(6);

				res.body.data.names.should.be.a("array");
				res.body.data.names.length.should.be.eq(6);
				done();
			});
	});
});

describe("/POST Faces Valid", () => {
	it("should return true if the id can be matched to the headshot id", done => {
		chai.request(server)
			.post("/faces/isvalid")
			.send({
				id: "14tyvyMcHuKOOsIGEWyyAG",
				imageID: "11cZoae2yaW24IqoWWSCue"
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.header["content-type"].should.be.eql(
					"application/json; charset=utf-8"
				);
				res.body.should.be.a("object");
				res.body.isValid.should.be.eql(true);
				done();
			});
	});

	it("should return false if the id is cannot be matched to the headshot id", done => {
		chai.request(server)
			.post("/faces/isvalid")
			.send({
				id: "1X2lomt8iIYImCQysey6Eq",
				imageID: "33GORUYsZ2GW26wQGeMoEK"
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.header["content-type"].should.be.eql(
					"application/json; charset=utf-8"
				);
				res.body.should.be.a("object");
				res.body.isValid.should.be.eql(false);
				done();
			});
	});
});
