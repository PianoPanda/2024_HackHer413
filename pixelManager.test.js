const scalePixelMatrix = require("./pixelManager.js");
const png2PixelMatrix = require("./pixelManager.js");

// import png2PixelMatrix from "./pixelManager.js";
// import scalePixelMatrix from "./pixelManager.js";

test("Basic 3x4 matrix", () => {
	matrix = [
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		[0, 1, 0, 0],
	];

	newWidth = 2;
	newHeight = 2;
	resultMatrix = [
		[0.5, 0],
		[0.5, 0.5],
		[1, 0],
	];
	scaledMatrix = scalePixelMatrix(matrix, newWidth, newWidth);
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
	matrix = png2PixelMatrix(framePath);
	console.log("This is miku:");
	console.log(matrix);
	console.log("Testing: ");
	console.log(scalePixelMatrix(matrix, 147, 180));
});
