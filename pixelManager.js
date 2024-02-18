import pngjs from 'pngjs'
import fs from 'fs';
import assert from 'assert'

class Image {
    constructor(width, height, data) {
        assert(width > 0 && width < 5000, "Invalid width. Width must be between 0 and 5000.");
        assert(height > 0 && height < 5000, "Invalid height. Height must be between 0 and 5000.");
        assert(data.length === width * height * 4, "Invalid data. Data length does not match dimensions.");

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
        assert(Number.isInteger(x) && Number.isInteger(y), "Invalid coordinates. x and y must be integers.");
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
            row.push(isBlackish ? '0' : '1'); //0 is black, 1 is white
        }
        binaryMatrix.push(row.join(''));
    }

    return binaryMatrix;
}

/**
 * @type {([number, number, number])[]}
 */
const COLORS = [
    [0xFF, 0xFF, 0xFF], //WHITE
    [0xE6, 0x7C, 0x73], //FLAMINGO
    [0xD5, 0x00, 0x00], //TOMATO
    [0xF4, 0x51, 0x1E], //TANGERINE
    [0xF6, 0xBF, 0x26], //BANANA
    [0x33, 0xB6, 0x79], //SAGE
    [0x03, 0x9B, 0xE5], //PEACOCK
    [0x79, 0x86, 0xCB], //LAVENDER
    [0x8E, 0x24, 0xAA], //GRAPE
    [0x61, 0x61, 0x61], //GRAPHITE
    [0x0B, 0x80, 0x43], //BASIL
    [0x3F, 0x51, 0xB5] //BLUEBERRY
];
//console.log(COLORS.findIndex(color => color[0] == 0xD5 && color[1] == 0x00 && color[1] == 0x00))

export function colorSimilarity(framePath) {
    const image = loadImageFromFile(framePath);
    const { width, height } = image;

    const colorMatrix = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            let closestColor = findClosestColor(image.getPixel(x, y)); //image.getPixel(x, y) returns a RGB value
            // console.log(closestColor);
            row.push(COLORS.findIndex(color => color[0]==closestColor[0] && color[1]==closestColor[1] && color[2]==closestColor[2]).toString(16));
            // color => color[0] == 0xD5 && color[1] == 0x00 && color[1] == 0x00
            //row.push(COLORS.findIndex(closestColor));
        }
        colorMatrix.push(row.join(''));
    }

    return colorMatrix;
}

function findClosestColor(rgbValue) {
    let minDistance = Infinity;
    let closestColor = null;

    COLORS.forEach(color => {
        const distance = calculateDistance(rgbValue, color);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color;
        }
    });

    return closestColor;
}

/**
 * 
 * @param {[number, number, number]} rgb1 
 * @param {[number, number, number]} rgb2 
 * @returns {number}
 */
function calculateDistance(rgb1, rgb2) {
    const sumOfSquares = rgb1.reduce((acc, val, index) => {
        const diff = val - rgb2[index];
        return acc + diff * diff;
    }, 0);
    return Math.sqrt(sumOfSquares);
}

// Example usage:
//Black and White testing
//const framePath = 'miku.png'; // Replace 'yingyang.png' with the path to your image file
//const framePath = 'yingyang.png';
// const framePath = 'undertale.png';
//console.log(png2PixelMatrix(framePath).join('\n'));

//Color testing
//const framePath = 'stevenLookAtThis.png';
const framePath = 'miku1.png';
console.log(colorSimilarity(framePath).join('\n'));

// width = # of col, height = # of row
export function scalePixelMatrix(matrix, newWidth, newHeight) {
    let oldWidth = matrix[0].length;
    let oldHeight = matrix.length;

    let scaledWidth = Math.floor(oldWidth / newWidth);
    let scaledHeight = Math.floor(oldHeight / newHeight);

    let binaryMatrix = [];
    for (let y = 0; y < newHeight; y++) {
        let row = [];
        for (let x = 0; x < newWidth; x++) {
            let sum = [0, 0, 0];
            let count = 0;
            for (let innerY = y * scaledHeight; innerY < (y + 1) * scaledHeight; innerY++) {
                for (let innerX = x * scaledWidth; innerX < (x + 1) * scaledWidth; innerX++) {
                    if (innerY < oldHeight && innerX < oldWidth) { // Check bounds
                        sum[0] += matrix[innerY][innerX][0];
                        sum[1] += matrix[innerY][innerX][1];
                        sum[2] += matrix[innerY][innerX][2];
                        count++;
                    }
                }
            }
            let average = [sum[0] / count, sum[1] / count, sum[2] / count];
            // TODO map through Steven's function
            row.push(average);
        }
        binaryMatrix.push(row);
    }
    return binaryMatrix;
}


export function printMatrix(matrix) {
    matrix.forEach(row => {
    console.log(row.join(''));
    });
}
