import {test, expect} from "bun:test";
import {buildCalendarColumn} from "./eventManager";

/**
 * 
 * @param {string} input 
 * @returns 
 */
function fastDefinition(input){
    return input.trim().split("\n").map(line => line.trim().split('').map(cell => cell === "1"))
}

test("circle", ()=>{
    const input = fastDefinition(`
    001100
    011110
    111111
    111111
    011110
    001100
    `)
    const output = buildCalendarColumn(input);
    console.log(output.toString())
    expect(output.length).toBe(19)
})

test("creeper", ()=>{
    const input = fastDefinition(`
    00000000
    00000000
    01100110
    01100110
    00011000
    00111100
    00100100
    00100100
    `)
    const output = buildCalendarColumn(input);
    console.log(output.toString())
    expect(output.length).toBe(29)
})