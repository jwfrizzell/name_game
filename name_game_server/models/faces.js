const axios = require("axios");

function generateRandomNumbers(max) {
	var arr = [];
	while (arr.length < 6) {
		var randomnumber = Math.floor(Math.random() * max) + 1;
		if (arr.indexOf(randomnumber) > -1) continue;
		arr[arr.length] = randomnumber;
	}
	return arr;
}

async function getFaceData() {
	const url = "https://www.willowtreeapps.com/api/v1.0/profiles";
	return await axios.get(url);
}

exports.getFaces = async function() {
	const request = await getFaceData();

	const indexArray = generateRandomNumbers(request.data.length);
	var list = [];

	//Get profiles at the random position returned from
	//indexArray
	for (var i = 0; i < indexArray.length; i++) {
		var data = request.data[indexArray[i]];
		list.push({
			id: data["id"],
			firstName: data["firstName"],
			lastName: data["lastName"],
			imageID: data["headshot"]["id"],
			imageURL: data["headshot"]["url"]
		});
	}
	return list;
};

exports.validateFace = async function(data) {
	const request = await getFaceData();
	const results = request.data.filter(faces => {
		return faces.id == data.id && faces.headshot.id == data.imageID;
	});
	if (results.length != 1) {
		return false;
	}
	return true;
};
