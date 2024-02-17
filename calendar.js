import { authorize } from "./auth.js"
import { google } from 'googleapis';

const CALENDAR_ID="43389c50be563ec14c5b7d28a65e3fc8081345a7c8c84cc8f225fa54f4139ee0@group.calendar.google.com"
const BASE_DATE = new Date("2024-02-11")



async function writeBlock(calendar, frame, { column, start, end, order, color }) {

  const time = new Date(BASE_DATE.getTime())
  time.setDate(time.getDate() + frame * 7 + column)
  time.setMinutes()

  const event =  {
    "summary": "a",
    "start": {
      "dateTime": "2024-02-17T09:00:00",
      "timeZone": "America/New_York"
    },
    "end": {
      "dateTime": "2024-02-17T09:00:00",
      "timeZone": "America/New_York"
    },
  }
  if (color) event.colorID = "8"
  
  // await calendar.events.insert({
    // "calendarId": CALENDAR_ID,
    // "resource": event
  // })
  console.log("HI")
}

function dostuff(auth) {

  const calendar = google.calendar({version: 'v3', auth});
  writeBlock(calendar, undefined, {})

}


authorize().then(dostuff)


