import { google } from "googleapis";
import { authorize } from "./auth.js";



const auth = await authorize()
const calendar = google.calendar({version: 'v3', auth});
const CALENDAR_ID="43389c50be563ec14c5b7d28a65e3fc8081345a7c8c84cc8f225fa54f4139ee0@group.calendar.google.com"

async function getstuff() {
  return (await calendar.events.list({
    calendarId: CALENDAR_ID,
    singleEvents: true,
    orderBy: 'startTime',
  })).data.items
}

async function wipeCalendar(calendar) {
  const stuff = await getstuff()
  for (const thing of stuff) {
    calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId: thing.id
    }).then(()=>{},()=>console.log("get rate limited"))
    await new Promise((res)=>setTimeout(res, 150))
  }
}


// await wipeCalendar(calendar)
console.log(await getstuff())
// console.log("waiting for stuff to finish")
// await new Promise(res => setTimeout(res, 10000))
