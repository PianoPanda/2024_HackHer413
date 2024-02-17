const fs = require('fs');

function png2PixelMatrix(framePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(framePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            // Assuming PNG format, you might need to adjust if it's a different format
            const header = data.toString('hex', 0, 8);
            if (header !== '89504e470d0a1a0a') {
                reject(new Error('File is not in PNG format'));
                return;
            }

            // Parse image dimensions
            const width = data.readUInt32BE(16);
            const height = data.readUInt32BE(20);
            const imageSize = { width, height }; // Object to store image size

            const binaryMatrix = [];
            for (let y = 0; y < height; y++) {
                const row = [];
                for (let x = 0; x < width; x++) {
                    // Calculate index of RGBA values
                    const index = (y * width + x) * 4 + 8; // RGBA values start from index 8
                    const red = data[index];
                    const green = data[index + 1];
                    const blue = data[index + 2];
                    // Check if pixel is white (255, 255, 255) or not
                    const isWhite = red === 255 && green === 255 && blue === 255;
                    row.push(isWhite ? '1' : '0'); // Convert to '0' or '1'
                }
                binaryMatrix.push(row.join('')); // Join each row into a string
            }

            resolve({ binaryMatrix: binaryMatrix.join('\n'), imageSize }); // Join rows with newline character
        });
    });
}

// Example usage:
const framePath = 'yingyang.png'; // Replace 'miku.png' with the path to your image file
png2PixelMatrix(framePath).then(({ binaryMatrix, imageSize }) => {
    // console.log('Image Size:', imageSize.width, 'x', imageSize.height); // Print the size of the image
    console.log(binaryMatrix); // Print the binary matrix
}).catch(error => {
    console.error('Error:', error);
});


function scalePixelMatrix(matrix, newWidth, newHeight) {
    oldWidth = matrix[0].length;
    oldHeight = matrix.length;

    // ignores some pixel, no biggie
    scaledWidth = oldWidth / newWidth;
    scaledHeight = oldHeight / newHeight;

    binaryMatrix = []
    row = -1

    for (outerWidth = 0; outerWidth < oldWidth; outerWidth += scaledWidth) {
        for (outerHeight = 0; outerHeight < oldHeight; outerHeight += scaledHeight) {
            sum = 0;
            binaryMatrix[++row] = []

            for (innerWidth = 0; innerWidth < scaledWidth; innerWidth++) {
                for (innerHeight = 0; innerHeight < scaledHeight; innerHeight++) {
                    sum += matrix[outerWidth + innerWidth][outerHeight + innerHeight];
                }
            }
            average = sum / (scaledHeight * scaledWidth);
            binaryMatrix[row].push(average);
        }
    }

    return binaryMatrix;
}