const dir = "/splitVideo";
import * as fs from 'node:fs'
import { png2PixelMatrix, scalePixelMatrix } from "./pixelManager.js";

var matrixBeforResize = [[]];
var matrixAfterResize = [[]];

const HEIGHT = 70;
const WIDTH = 112;

fs.readdir(dir, (err, files) =>{
        if(err){
            console.log("error is "+ err);
        }
        files.forEach((frame, index)=>{
            matrixBeforResize = png2PixelMatrix(dir+frame).join('\n');
            matrixAfterResize = scalePixelMatrix(matrixBeforResize, WIDTH, HEIGHT);
        })
    }
)
