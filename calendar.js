import { authorize } from "./auth.js"
import { google } from 'googleapis';

const CALENDAR_ID="43389c50be563ec14c5b7d28a65e3fc8081345a7c8c84cc8f225fa54f4139ee0@group.calendar.google.com"

async function writeBlock(calendar, frame, { column, startTime, endTime, order }) {
  
  
  await calendar.events.insert({
    "calendarId": CALENDAR_ID,
    "resource": {
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
  })
  console.log("HI")
}

function dostuff(auth) {

  const calendar = google.calendar({version: 'v3', auth});
  writeBlock(calendar)

}

authorize().then(dostuff)


