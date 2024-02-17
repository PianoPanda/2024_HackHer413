class Block{
    column;
    start;
    end;
    order;
    color;
    constructor(column, start, end, order, color) {
        this.column = column;
        this.start = start;
        this.end = end;
        this.order = order;
        this.color = color;
    }
    toString(){
        return `${this.color ? "b" : "w"}${this.start}-${this.end}`
    }
}

/**
 * @param {boolean[][]} matrix 
 * @returns {Block[]}
 * NOTE: `Block.column` is set to `0` for all blocks and start/end times are just integers starting at `0`
 */
export function buildCalendarColumn(matrix){
    /**
     * optimizes a row!
     * @param {boolean[]} rawRow 
     * @returns {boolean[]}
     */
    function optimizeRow(rawRow){
        const rowWidth = rawRow.length;
        const outRow = [];
        for(let colCountOptimized = 1; colCountOptimized <= rowWidth; colCountOptimized++){
            if((rowWidth % colCountOptimized) !== 0)
                continue;
            const stride = rowWidth / colCountOptimized;
            let optimSuccessful = true;
            outRow.splice(0);
            // i is the horizontal order within the optimized row
            for(let i = 0; i < colCountOptimized; i++){
                const blockColor = rawRow[i * stride];
                if(!rawRow.slice(i * stride, i * stride + stride).every(pixColor => pixColor === blockColor)){
                    // console.log(`${rawRow.toString()} cannot be optimized to resolution of ${colCountOptimized}`)
                    optimSuccessful = false;
                    break;
                }
                outRow.push(blockColor);
            }
            if(optimSuccessful)
                break;
        }
        return outRow;
    }
    // Tests
    // console.log(optimizeRow([true, true, false, false, true, true, false, false]))
    // console.log(optimizeRow([true, true, false, false, true, true]))
    // console.log(optimizeRow([true, true, true, false, false, false]))
    // console.log(optimizeRow([true, true, true, true, true, true]))

    const output = [];

    let vBlockData = [];
    let vBlockStart = 0;
    let vBlockEnd = 0;
    matrix.forEach(row => {
        const optimized = optimizeRow(row);
        // Ignore if equal
        const isEqual = 
            (optimized.length === vBlockData.length) &&
            optimized.every((newColor, column) => {
                return vBlockData[column] === newColor;
            });
        if(!isEqual){
            // Push old block
            vBlockData.forEach((color, order) =>{
                output.push(new Block(0, vBlockStart, vBlockEnd, order, color));
            })
            // Initialize a new block
            vBlockStart = vBlockEnd;
            vBlockData = optimized.map(x => x);
        }
        vBlockEnd++; // TODO make this relevant to actual IRL times
    })
    // Push the final block
    vBlockData.forEach((color, order) =>{
        output.push(new Block(0 /** TODO */, vBlockStart, vBlockEnd, order, color));
    })
    return output;
}
// Tests
// console.log(buildCalendarColumn([
//     [true, true, false, false, false, false],
//     [true, true, false, false, false, false],
//     [true, true, true,  true,  false, false],
//     [true, true, true,  false, false, false],
//     [true, true, true,  false, false, false],
//     [true, true, false, false, false, false],
// ]));
