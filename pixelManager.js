const { PNG } = require("pngjs");
const fs = require("fs");
const assert = require("assert");

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
    assert(filePath.endsWith(".png"), "Only `.png` files are supported.");

    if (!fs.existsSync(filePath)) {
        throw new Error(`Unable to locate file: \`${filePath}\``);
    }
    fs.accessSync(filePath, fs.constants.R_OK);

    const png = PNG.sync.read(fs.readFileSync(filePath));
    return new Image(png.width, png.height, Uint8ClampedArray.from(png.data));
}

function png2PixelMatrix(framePath) {
    return new Promise((resolve, reject) => {
        try {
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

            resolve({ binaryMatrix: binaryMatrix, imageSize: { width, height } });
        } catch (error) {
            reject(error);
        }
    });
}

// Example usage:
const framePath = 'yingyang.png'; // Replace 'yingyang.png' with the path to your image file
png2PixelMatrix(framePath).then(({ binaryMatrix, imageSize }) => {
    console.log('Image Size:', imageSize.width, 'x', imageSize.height); // Print the size of the image
    console.log(binaryMatrix.join('\n')); // Print the binary matrix row by row
}).catch(error => {
    console.error('Error:', error);
});

// width = # of col, height = # of row
function scalePixelMatrix(matrix, newWidth, newHeight) {
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

module.exports = scalePixelMatrix;