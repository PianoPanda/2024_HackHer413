// function png2PixelMatrix(frame) {
//     const img = new Image();
//     img.src = frame;
//     const canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;

//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(img, 0, 0);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const pixelData = imageData.data;

//     const rgbMatrix = [];
//     for (let i = 0; i < canvas.height; i++) {
//         const row = [];
//         for (let j = 0; j < canvas.width; j++) {
//             const index = (i * canvas.width + j) * 4;
//             const red = pixelData[index];
//             const green = pixelData[index + 1];
//             const blue = pixelData[index + 2];
//             row.push([red, green, blue]);
//         }
//         rgbMatrix.push(row);
//     }

//     return rgbMatrix;
// }

// // // Example usage:
// // const frame = 'path_to_your_image.png';
// // console.log(pixelMatrix); // Print the RGB matrix to console

function png2PixelMatrix(frame) {
    const img = new Image();
    img.src = frame;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;

    const binaryMatrix = [];
    for (let i = 0; i < canvas.height; i++) {
        const row = [];
        for (let j = 0; j < canvas.width; j++) {
            const index = (i * canvas.width + j) * 4;
            const red = pixelData[index];
            const green = pixelData[index + 1];
            const blue = pixelData[index + 2];
            // Check if pixel is white (255, 255, 255) or not
            const isWhite = red === 255 && green === 255 && blue === 255;
            row.push(isWhite ? 1 : 0);
        }
        binaryMatrix.push(row);
    }

    return binaryMatrix;
}

// Example usage:
const frame = "./miku.jpeg"; // path to image file
const binaryMatrix = png2PixelMatrix(frame);
console.log(binaryMatrix); // Print the binary matrix to console


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