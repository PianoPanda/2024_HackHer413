import assert from 'assert';

function scaleMatrix(input, width, height){
    input = sliceMatrix(input);

    const widthR = input[0].length / width;
    const heightR = input.length / height;

    let widthRA = [];
    let heightRA = [];

    for (let x = 0 ; x < widthR ; x++){
        widthRA.push(x);
    }

    for (let y = 0 ; y < heightR ; y++){
        heightRA.push(y);
    }

    outputMatrix = [[]];

    for (let currXPos = 0; currXPos <= input[0].length; currXPos ++){
        for (let currYPos = 0; currYPos <= input.length; currYPos ++){
            let sum = 0;
            widthRA.forEach(x=>{
                heightRA.forEach(y=>{
                    sum += input[x][y];
                })
            })
            widthRA += widthR;
            heightRA += heightR;
            currXPos += widthR;
            currYPos += heightR;
        }
    }
}

function sliceMatrix(input, width, height){
    input = input.slice(input.length % height);
    for (let n = 0; n<input.length; n++){
        input[n].slice(input[0].length % width);
    }
    return input;
}

export function SparateTo7Days(matrix){
    assert(matrix.length === 70 && matrix[0].length === 112);

    let n = 0;
    let Week = [[],[],[],[],[],[],[]];
    let Day = [];
    for (let x = 0; x<70; x++){
        Day.push([]);
    }
    while(n<=112){
        for (let m = 0 ; m< 70 ; m++){
            Day[m].push(matrix[m][n%16]);
        }
        n++;
        if(n%16 === 0){
            Week.push(Day);
            Day = [];
        }
    }

    Week.pop();

    let Mon = Week[0];
    let Tue = Week[1];
    let Wed = Week[2];
    let Thu = Week[3];
    let Fri = Week[4];
    let Sat = Week[5];
    let Sun = Week[6];

    console.log(Week[0].length);
    //console.log(Mon);

    return {Mon, Tue, Wed, Thu, Fri, Sat, Sun};

}