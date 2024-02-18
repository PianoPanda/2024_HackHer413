const { assert } = require("console");
const {
	scalePixelMatrix,
	png2PixelMatrix,
	printMatrix,
	readColorImage,
	illuminate,
} = require("./pixelManager.js");
import Jimp from "jimp";
import fs from "fs";

test("Basic 4x4 matrix", () => {
	let matrix = [
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	];

	let newWidth = 2;
	let newHeight = 2;
	let resultMatrix = [
		[0, 1],
		[0, 0],
	];
	let scaledMatrix = scalePixelMatrix(matrix, newHeight, newWidth);
	for (let i = 0; i < scaledMatrix[0].length; i++) {
		for (let j = 0; j < scaledMatrix.length; j++) {
			expect(scaledMatrix[i][j]).toBe(resultMatrix[i][j]);
		}
	}
});

// 480 x 360 -> 112 x 70
test("printing matrix: ", () => {
	let matrix = png2PixelMatrix("./test/testImages/sampleFrame.png");
	let scaledMatrix = scalePixelMatrix(matrix, 70, 112);
	//console.log("Unscaled BAD APPLE: ", matrix)
	//console.log("Scaled BAD APPLE: ", printMatrix(scaledMatrix));
});

test("Size verification", () => {
	let matrix = png2PixelMatrix("./test/testImages/sampleFrame.png");
	let scaledMatrix = scalePixelMatrix(matrix, 70, 112);
	assert(scaledMatrix.length == 70);
	scaledMatrix.forEach((row) => {
		assert(row.length == 112);
	});
});

test("Reading image pixel color", async () => {
	// Create a new image
	let image = await new Jimp(3, 3, 0xff0000ff); // This creates a 3x3 image with red pixels

	// Write the image to a file asynchronously
	await image.writeAsync("./modifiedImages/red.png");

	// After writing, read the image back and test the pixels
	try {
		let pixelArr = await readColorImage("./modifiedImages/red.png");
		console.log("check")

		pixelArr.forEach((value) => {
			// Assuming value is an object like {r: 255, g: 0, b: 0, a: 255}
			assert(
				value.r === 255 && value.g === 0 && value.b === 0,
				"Pixel color does not match expected red color"
			);
		});
	} catch (e) {
		throw new Error("Reading pixel color test failed: " + e.message);
	}
});

//test("")
