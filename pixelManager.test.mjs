const { scalePixelMatrix, png2PixelMatrix } = require("./pixelManager.js");
//import { scalePixelMatrix, png2PixelMatrix } from "./pixelManager.js";


test("Basic 4x4 matrix", () => {
	matrix = [
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		[0, 1, 0, 0],
		[0, 0, 0, 0]
	];

	newWidth = 2;
	newHeight = 2;
	resultMatrix = [
		[0, 1],
		[0, 0]
	];
	scaledMatrix = scalePixelMatrix(matrix, newHeight, newWidth);
	console.log("2x2:", scaledMatrix);
	for (i = 0; i < scaledMatrix[0].length; i++) {
		for (j = 0; j < scaledMatrix.length; j++) {
			expect(scaledMatrix[i][j]).toBe(resultMatrix[i][j]);
		}
	}
	// expect(scalePixelMatrix(matrix, newWidth, newWidth)).toBe(resultMatrix);
});

test("360x295 Miku resizing", () => {
	// 180 x 147
	const framePath = "miku.png";
	//matrix = png2PixelMatrix(framePath);
	// console.log("This is miku:");
	// console.log(matrix);
	// console.log("Testing: ");
	//console.log(scalePixelMatrix(matrix, 180, 147));
});

test("360x295 Miku downsizing 4x", () => {
	// 90 x 73
	const framePath = "miku.png";
	matrix = png2PixelMatrix(framePath);
	// console.log("This is miku:");
	// console.log(matrix);
	// console.log("Testing: ");
	console.log(scalePixelMatrix(matrix, 90, 73));
});
