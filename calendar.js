import { authorize } from "./auth.js"
import { google } from 'googleapis';

const CALENDAR_ID="43389c50be563ec14c5b7d28a65e3fc8081345a7c8c84cc8f225fa54f4139ee0@group.calendar.google.com"
const BASE_DATE = new Date("2024-02-11")


writeBlock(undefined, 0, { column: 0, start: 1, end: 2, order: 0, color: true })

async function writeBlock(calendar, frame, { column, start, end, order, color }) {

  const t_start = new Date(BASE_DATE.getTime())
  t_start.setDate(t_start.getDate() + frame * 7 + column)
  t_start.setMinutes(8 * 60 + start * 15)

  const t_end = new Date(t_start.getTime())
  t_end.setMinutes(t_end.getMinutes() + (end - start) * 15)
  t_start.setMinutes(t_start.getMinutes() + order)

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
  if (color) event.colorID = "8"
  
  await calendar.events.insert({
    "calendarId": CALENDAR_ID,
    "resource": event
  })
}

function dostuff(auth) {

  const calendar = google.calendar({version: 'v3', auth});
  writeBlock(calendar, undefined, {})

}


// authorize().then(dostuff)


