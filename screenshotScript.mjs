// run `google-chrome --remote-debugging-port=21222` and navigate to google calendar for this to work

import puppeteer from "puppeteer"
import fs from "fs/promises"
(async() => {
   await fs.mkdir("screenshots", {recursive: true});
   const browserURL = 'http://127.0.0.1:21222';
   const browser = await puppeteer.connect(
      {browserURL}
   );
   const pages = await browser.pages();
   const calendarPage = pages[0];
   await calendarPage.setViewport({
      width: 1500,
      height: 1000,
   })
   for(let i = 0; i < 10; i++){
      await calendarPage.keyboard.press("j");
      await calendarPage.keyboard.press("j");
      await calendarPage.keyboard.press("k");
      await calendarPage.screenshot({
         path: `screenshots/frame${i}.png`
      })
   }
   await browser.disconnect();
})()
