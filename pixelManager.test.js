// const scalePixelMatrix = require("./pixelManager.js");
// const png2PixelMatrix = require("./pixelManager.js");

import { png2PixelMatrix, scalePixelMatrix } from "./pixelManager.js";

test("Basic 3x4 matrix", () => {
	let matrix = [
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		[0, 1, 0, 0],
	];

	let newWidth = 2;
	let newHeight = 2;
	let resultMatrix = [
		[0.5, 0],
		[0.5, 0.5],
		[1, 0],
	];
	let scaledMatrix = scalePixelMatrix(matrix, newWidth, newWidth);
	for (let i = 0; i < scaledMatrix[0].length; i++) {
		for (let j = 0; j < scaledMatrix.length; j++) {
			expect(scaledMatrix[i][j]).toBe(resultMatrix[i][j]);
		}
	}
	// expect(scalePixelMatrix(matrix, newWidth, newWidth)).toBe(resultMatrix);
});

test("360x295 Miku resizing", () => {
	// 180 x 147
	const framePath = "miku.png";
	let matrix = png2PixelMatrix(framePath);
	console.log("This is miku:");
	console.log(matrix);
	console.log("Testing: ");
	console.log(scalePixelMatrix(matrix, 147, 180));
});
