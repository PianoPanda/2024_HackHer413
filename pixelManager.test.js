const scalePixelMatrix = require("./pixelManager.js");

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
