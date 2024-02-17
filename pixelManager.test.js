const { assert } = require("console");
const { scalePixelMatrix, png2PixelMatrix, printMatrix } = require("./pixelManager.js");

test.skip("Basic 4x4 matrix", () => {
	matrix = [
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	];

	newWidth = 2;
	newHeight = 2;
	resultMatrix = [
		[0, 1],
		[0, 0],
	];
	scaledMatrix = scalePixelMatrix(matrix, newHeight, newWidth);
	console.log("2x2:", scaledMatrix);
	for (i = 0; i < scaledMatrix[0].length; i++) {
		for (j = 0; j < scaledMatrix.length; j++) {
			expect(scaledMatrix[i][j]).toBe(resultMatrix[i][j]);
		}
	}
});

// 480 x 360 -> 112 x 70
test("printing matrix: ", () =>{
	matrix = png2PixelMatrix("sampleFrame.png")
	scaledMatrix = scalePixelMatrix(matrix, 70, 112)
	//console.log("Unscaled BAD APPLE: ", matrix)
	//console.log("Scaled BAD APPLE: ", printMatrix(scaledMatrix));
});

test("Size verification", () => {
	matrix = png2PixelMatrix("sampleFrame.png");
	scaledMatrix = scalePixelMatrix(matrix, 70, 112);
	assert(scaledMatrix.length == 70)
	scaledMatrix.forEach((row) => {
		assert(row.length == 112);
	});
});


