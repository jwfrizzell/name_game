const axios = require("axios");

function generateRandomNumbers(maxRange, listSize) {
	var arr = [];
	while (arr.length < listSize) {
		var randomnumber = Math.floor(Math.random() * maxRange) + 1;
		if (arr.indexOf(randomnumber) > -1) continue;
		arr[arr.length] = randomnumber;
	}
	return arr;
}

async function getFaceData() {
	const url = "https://www.willowtreeapps.com/api/v1.0/profiles";
	return await axios.get(url);
}

exports.getFaces = async function(data) {
	const request = await getFaceData();

	let size = parseFloat(data.size);
	if (size > request.data.length) {
		size = request.data.length;
	}
	//Random selection from complete list of names.
	const indexArray = generateRandomNumbers(request.data.length, size);

	//Random order for setting the index of the list of names.
	const indexArrayReordered = generateRandomNumbers(size, size);
	var listImages = [];
	var listNames = new Array(size);
	//Get profiles at the random position returned from
	//indexArray
	for (var i = 0; i < indexArray.length; i++) {
		var data = request.data[indexArray[i]];
		if (data != undefined) {
			listImages.push({
				id: data["id"],
				imageID: data["headshot"]["id"],
				imageURL: data["headshot"]["url"]
			});

			listNames[indexArrayReordered[i] - 1] = {
				id: data["id"],
				firstName: data["firstName"],
				lastName: data["lastName"]
			};
		}
	}
	return { names: listNames, images: listImages };
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
