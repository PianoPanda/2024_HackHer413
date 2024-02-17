const dir = "splitVideo";
import * as fs from 'node:fs';
import { png2PixelMatrix, scalePixelMatrix, printMatrix } from "./pixelManager.js";
import { SeperateTo7Days } from "./scaleMatrix.js";
import { authorize } from "./auth.js";
import { writeFrame, writeBlock, wipeCalendar } from './calendar.js';
import { buildCalendarColumn } from './eventManager.js';
import { google } from 'googleapis';

const HEIGHT = 70;
const WIDTH = 112

const auth = await authorize()
const calendar = google.calendar({version: 'v3', auth});
const CALENDAR_ID="43389c50be563ec14c5b7d28a65e3fc8081345a7c8c84cc8f225fa54f4139ee0@group.calendar.google.com"

/*
fs.readdir("./"+dir, (_, files) => {

  const a = files[84]
  files = [a]; 
  
  files.forEach((file, frame) => {
    const matrixBeforResize = png2PixelMatrix(dir+'/'+file);
    const matrixAfterResize = scalePixelMatrix(matrixBeforResize, WIDTH, HEIGHT);
    const days = SeperateTo7Days(matrixAfterResize)
    const blocks = days.map(day => buildCalendarColumn(day))

    // for (let i=0; i<blocks)
    // writeBlock(0, blocks[0][0], async event => {
      // console.log(event)
      // calendar.events.insert({
        // "calendarId": CALENDAR_ID,
        // "resource": event
      // }).then(console.log)
    // })
    
    writeFrame(calendar, blocks, frame)
  })
})*/
wipeCalendar(calendar)
