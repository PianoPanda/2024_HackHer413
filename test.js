import process from "process"

function log(column, frame) {
  process.stdout.write(`\r[${".".repeat(column)}${" ".repeat(6 - column)}]` +
    `[${".".repeat(Math.ceil(frame/26.27))}${" ".repeat((2627-frame)/26.27|0)}]` +
    ` aka ${frame} / ${2627}`)
}

for (let i=0; i<2628; i++) {
  for (let j=0; j<7; j++) {
    log(j, i)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}

