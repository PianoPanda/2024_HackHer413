const dir = "splitVideo";
import * as fs from 'node:fs';
import { png2PixelMatrix, scalePixelMatrix } from "./pixelManager.js";
import {SparateTo7Days} from "./scaleMatrix.js";

var matrixBeforResize = [[]];
var matrixAfterResize = [[]];

const HEIGHT = 70;
const WIDTH = 112;

fs.readdir(dir, (err, files) =>{
        if(err){
            console.log("error is "+ err);
        }
        //files = [dir + files[0]];
        // files.forEach((frame, index)=>{
        //     matrixBeforResize = png2PixelMatrix(dir+frame).join('\n');
        //     matrixAfterResize = scalePixelMatrix(matrixBeforResize, WIDTH, HEIGHT);
        //     let {Mon, Tue, Wed, Thu, Fri, Sat, Sun} = SparateTo7Days(matrixAfterResize);
        // })
        let frame = files[0]; 
        matrixBeforResize = png2PixelMatrix(dir+'/'+frame);
        matrixAfterResize = scalePixelMatrix(matrixBeforResize, WIDTH, HEIGHT);
        let {Mon, Tue, Wed, Thu, Fri, Sat, Sun} = SparateTo7Days(matrixAfterResize);
    }
)
