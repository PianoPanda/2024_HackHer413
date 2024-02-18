import pngjs from "pngjs";
import fs from "fs";
import assert from "assert";
import Jimp from "jimp";
import { error } from "console";

// Example usage:
//const framePath = './test/testImages/miku.png'; // Replace 'yingyang.png' with the path to your image file
// const framePath = './test/testImages/yingyang.png';
// //const framePath = './test/testImages/undertale.png';
// console.log(png2PixelMatrix(framePath).join('\n'));
class Image {
	constructor(width, height, data) {
		assert(
			width > 0 && width < 5000,
			"Invalid width. Width must be between 0 and 5000."
		);
		assert(
			height > 0 && height < 5000,
			"Invalid height. Height must be between 0 and 5000."
		);
		assert(
			data.length === width * height * 4,
			"Invalid data. Data length does not match dimensions."
		);

		this.width = width;
		this.height = height;
		this.data = data;
		this.rowSize = this.width * 4;
	}

	getPixel(x, y) {
		this.assertCoordinatesInBounds(x, y);
		const offset = this.getOffset(x, y);

		return [this.data[offset], this.data[offset + 1], this.data[offset + 2]];
	}

	assertCoordinatesInBounds(x, y) {
		assert(
			Number.isInteger(x) && Number.isInteger(y),
			"Invalid coordinates. x and y must be integers."
		);
		assert(x >= 0 && x < this.width, "x is out of bounds.");
		assert(y >= 0 && y < this.height, "y is out of bounds.");
	}

	getOffset(x, y) {
		return y * this.rowSize + x * 4;
	}
}

function loadImageFromFile(filePath) {
	if (!fs.existsSync(filePath)) {
		throw new Error(`Unable to locate file: \`${filePath}\``);
	}
	fs.accessSync(filePath, fs.constants.R_OK);

	const png = pngjs.PNG.sync.read(fs.readFileSync(filePath));
	return new Image(png.width, png.height, Uint8ClampedArray.from(png.data));
}

export function png2PixelMatrix(framePath) {
	const image = loadImageFromFile(framePath);
	const { width, height } = image;

	const binaryMatrix = [];
	for (let y = 0; y < height; y++) {
		const row = [];
		for (let x = 0; x < width; x++) {
			const [red, green, blue] = image.getPixel(x, y);
			const isBlackish = red <= 128 && green <= 128 && blue <= 128;
			row.push(isBlackish ? "0" : "1"); //0 is black, 1 is white
		}
		binaryMatrix.push(row);
	}

	return binaryMatrix;
}



/**
 * Reads a colored image and converts it into a 3D array
 * Pixels are (R, G, B, A)
 * @param {string} filePath - string file name
 * @returns {Array} 3D array representation of the image
 */
//readColorImage("./test/testImages/sampleFrame.png");
export async function readColorImage(filePath) {
    //console.log(filePath)
    
	await Jimp.read(filePath, (e, sample) => {
		if (e) throw e;
		let imgHeight = sample.bitmap.height;
		let imgWidth = sample.bitmap.width;


		let pixelArr = [];
		// read row by row
		for (let y = 0; y < imgHeight; y++) {
			let row = [];
			for (let x = 0; x < imgWidth; x++) {
				// hex to R, G, B, A
				let pixel = Jimp.intToRGBA(sample.getPixelColor(x, y));
				row.push(pixel);
			}
			pixelArr.push(row);
		}
        return pixelArr;
	});
}
readColorImage("./modifiedImages/red.png")
/**
 * This method takes an image and a scale factor 
 * It first shrinks the image by the scale
 * It then modifies each pixel for luminance
 * Saves the illuminated image in modified folder
 * @param {string} filePath - file path of the image
 * @param {number} scaleFactor - factor to scale by
 */
export function illuminate(filePath, scaleFactor) {
	Jimp.read(filePath, (e, sample) => {
		if (e) throw e;
		// resizing
		sample = sample.scale(scaleFactor, Jimp.RESIZE_BILINEAR);
		let location = "./modifiedImages/illuminatedImage.png";

		// core illumination logic
		for (let y = 0; y < sample.height; y++) {
			for (let x = 0; x < sample.width; x++) {
				// retrieving pixel color in HEX, converting to rgba, then into array for modification
				let rgb = Object.values(Jimp.intToRGBA(sample.getPixelColor(x, y)));
				rgb = rgb.map(([r, g, b, _]) => {
					r = (r / 255) ** 2.2;
					g = (g / 255) ** 2.2;
					b = (b / 255) ** 2.2;
				});
				// setting modified rgba value to image
				sample.setPixelColor(Jimp.rgbaToInt(rgb), x, y);
			}
		}
		// saving the modified image
		sample.write(location);
	});
}
illuminate("./test/testImages/lenna.jpg", 0.5);

/**
 * Takes a binary matrix image representation and scales down the image by non-overlapping block processing
 * Takes the average pixel value of each block and determines the new pixel value via a threshold
 * @param {Array} matrix - A matrix of 0s and 1s representing black and white image
 * @param {number} newHeight - new height to scale the image into
 * @param {number} newWidth - new width to scale the image into
 * @returns {Array} - A new binary matrix of the scaled down image
 */
// width = # of col, height = # of row
export function scalePixelMatrix(matrix, newHeight, newWidth) {
	let oldWidth = matrix[0].length;
	let oldHeight = matrix.length;

	let scaledWidth = Math.floor(oldWidth / newWidth);
	let scaledHeight = Math.floor(oldHeight / newHeight);

	let binaryMatrix = [];
	for (let i = 0; i < newHeight; i++) {
		let row = [];
		for (let j = 0; j < newWidth; j++) {
			let sum = 0;
			let count = 0;

			// inner grid of pixels
			for (
				let innerI = i * scaledHeight;
				innerI < (i + 1) * scaledHeight;
				innerI++
			) {
				for (
					let innerJ = j * scaledWidth;
					innerJ < (j + 1) * scaledWidth;
					innerJ++
				) {
					if (innerJ < oldHeight && innerI < oldWidth) {
						sum += matrix[innerI][innerJ];
						count++;
					}
				}
			}
			let average = sum / count;
			row.push(average >= 0.5 ? 1 : 0);
		}
		binaryMatrix.push(row);
	}

	return binaryMatrix;
}

/**
 * Prints a black and white image represented by a binary matrix
 * @param {Array} matrix - A 2D binary matrix representation of a black and white image
 */
export function printMatrix(matrix) {
	matrix.forEach((row) => {
		console.log(row.join(""));
	});
}
