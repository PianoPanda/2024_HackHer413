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

function endsWith(name) {
    arr = String(name).split(".")
    if (arr[1] === "png") {
        //console.log("Wrong file format");
        return true;
    }
    console.log("Wrong file format");
    return false;
}

function loadImageFromFile(filePath) {
    //console.log(endsWith(filePath))
    //assert(endsWith(filePath), "Only `.png` files are supported.");

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
            const isBlack = red === 0 && green === 0 && blue === 0;
            row.push(isBlack ? '0' : '1');
        }
        binaryMatrix.push(row.join(''));
    }

    return binaryMatrix;
}

// Example usage:
//const framePath = 'miku.png'; // Replace 'yingyang.png' with the path to your image file
const framePath = 'yingyang.png';
//const framePath = 'undertale.png';
console.log(png2PixelMatrix(framePath).join('\n'));

// width = # of col, height = # of row
export function scalePixelMatrix(matrix, newWidth, newHeight) {
    oldWidth = matrix[0].length;
    oldHeight = matrix.length;
    // console.log("length", oldHeight)
    // console.log("width", oldWidth)

    // ignores some pixel, no biggie
    scaledWidth = Math.floor(oldWidth / newWidth);
    scaledHeight = Math.floor(oldHeight / newHeight);


    binaryMatrix = [[]]
    row = 0

    for (outerWidth = 0; outerWidth < oldWidth; outerWidth += scaledWidth) {
        for (outerHeight = 0; outerHeight < oldHeight; outerHeight += scaledHeight) {
            sum = 0;
            
            for (innerWidth = 0; innerWidth < scaledWidth; innerWidth++) {
                for (innerHeight = 0; innerHeight < scaledHeight; innerHeight++) {
                    // console.log("outerWidth:", outerWidth)
                    // console.log("innerWidth:", innerWidth)
                    // console.log("outerHeight:", outerHeight)
                    // console.log("innerHeight:", innerHeight)
                    // console.log("coord: ", outerWidth + innerWidth, ", ", outerHeight + innerHeight)

                    // console.log("matrix value: ", matrix[outerHeight + innerHeight][outerWidth + innerWidth])
                    // width -> column, height -> row
                    // A_ij = A_hw
                    sum += matrix[outerHeight + innerHeight][outerWidth + innerWidth];
                }
            }
            average = sum / (scaledHeight * scaledWidth);
            if (binaryMatrix[row].length == newWidth) {
                row += 1;
                binaryMatrix[row] = []
            }
            binaryMatrix[row].push(average);
            // console.log(binaryMatrix)
        }
    }
    return binaryMatrix;
}