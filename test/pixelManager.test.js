const scalePixelMatrix = require("/Users/junyanglu/Documents/GitHub/Personal_Projects/2024_HackHer413/pixelManager.js");

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
    
	expect(scalePixelMatrix(matrix, newWidth, newWidth)).toBe(resultMatrix);
});
