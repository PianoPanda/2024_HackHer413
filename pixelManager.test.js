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
