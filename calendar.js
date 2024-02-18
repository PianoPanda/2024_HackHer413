import { authorize } from "./auth.js"
import { google } from 'googleapis';
import process from "process"

// const CALENDAR_ID="43389c50be563ec14c5b7d28a65e3fc8081345a7c8c84cc8f225fa54f4139ee0@group.calendar.google.com"
const BASE_DATE = new Date("2024-02-11")

export async function writeBlock(calendar, CALENDAR_ID, frame, column, { start, end, order, color }) {

  const t_start = new Date(BASE_DATE)
  t_start.setUTCDate(t_start.getUTCDate() + frame * 7 + column)
  t_start.setMinutes(t_start.getMinutes() + start * 15)

  const t_end = new Date(t_start)
  t_end.setMinutes(t_end.getMinutes() + (end - start) * 15)
  t_start.setSeconds(t_start.getSeconds() + order)

  const s_start = t_start.toISOString().substring(0, 19)
  const s_end = t_end.toISOString().substring(0, 19)

  const event =  {
    "summary": "a",
    "start": {
      "dateTime": s_start,
      "timeZone": "America/New_York"
    },
    "end": {
      "dateTime": s_end,
      "timeZone": "America/New_York"
    },
  }
  if (!color) event.colorId = "8"
  const res = calendar.events.insert({
    calendarId: CALENDAR_ID,
    resource: event
  })
  return res
}



export function log(column, frame) {
  process.stdout.write(`\r[${".".repeat(column)}${" ".repeat(6 - column)}]` +
    `[${".".repeat(Math.ceil(frame/26.27))}${" ".repeat((2627-frame)/26.27|0)}]` +
    ` aka ${frame} / ${2627}`)
}

export async function writeFrame(calendar, blocks, frame) {

  // for (let column=0; column<7; column++) { 
    // for (const block of blocks[column]) {
      // await writeBlock(calendar, frame, column, block)
        // .then(() => log(column, frame), () => { console.log("DYING"); process.exit(0)})
    // }
  // }

}

function writeFrameToICSs(blocks, frame) {
  let white = ""
  let black = ""

  for (const block of blocks) {
    writeBlock(frame, block, event => {
      let stuff = "BEGIN:VEVENT\n"
      const start = new Date(event.start.dateTime).getTime()
      const end = new Date(event.end.dateTime).getTime()
      stuff += `DTSTAMP:${start}\n`
      stuff += `DTSTART:${start}\n`
      stuff += `DTEND:${end}\n`
      stuff += `SUMMART:${event.summary}\n`
      stuff += "END:VEVENT\n"
      if (event.colorId) black += stuff
      else white += stuff
    })
  }

  return [white, black]
}
