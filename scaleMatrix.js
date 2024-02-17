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