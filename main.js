const dir = "splitVideo";
import * as fs from 'node:fs';
import { png2PixelMatrix, scalePixelMatrix, printMatrix } from "./pixelManager.js";
import { SeperateTo7Days } from "./scaleMatrix.js";

var matrixBeforResize = [[]];
var matrixAfterResize = [[]];

const HEIGHT = 70;
const WIDTH = 112;

fs.readdir(dir, files => {

  let files = [files[84]]; 
  
  files.forEach((file, i) => {
    const matrixBeforResize = png2PixelMatrix(dir+'/'+file);
    const matrixAfterResize = scalePixelMatrix(matrixBeforResize, WIDTH, HEIGHT);
    const res = SeperateTo7Days(matrixAfterResize)

    res.forEach(
      
    )

    
  })
})
