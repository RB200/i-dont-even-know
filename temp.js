let mouseDownShapeTargeted = false
let currentShape
let currentGoal
let level = 0
let nextLevel
let corner
let side
let lvlorientation
let data = {
    'levelData' : {
        'level0' : {
            'shapes': {
                'pc1' : {
                    x: 100,
                    y: 100,
                    width: 200,
                    height: 100,
                },
            },
            'goals' : {
                'level0goal' : {
                    x: 100,
                    y: 500,
                    width: 1000,
                    height: 500,
                },
                'greenbox' : {
                    x: 500,
                    y:700,
                    width: 200,
                    height:100,
                },
            },
            'text' : 'Put the red shape on the green box and press ENTER.',
        },
        'level1' : {
            'shapes': {
                'pc2' : {
                    x: 0,
                    y: 0,
                    width:0,
                    height:0,
                },
            },
            'goals' : {
                'level1goal' : {
                    x:100,
                    y:100,
                    width:1000,
                    height:1000,
                },
            },
            'text' : 'Three down from the top.\nSeven over from the left.'
        },
        'level2' : {
            'shapes': {
                'pc3' : {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                },
            },
            'goals' : {
                'level2goal' : {
                    x:500,
                    y:500,
                    width:1000,
                    height:300,
                },
            },
            'text' : 'Where two non-grid points meet.'
        },
        'level3' : {
            'shapes' : {
                'pc4' : {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                },
            },
            'goals' : {
                'level3goal' : {
                    x:500,
                    y:500,
                    width:1000,
                    height:600,
                },
                'greenbox1' : {
                    x:500,
                    y:700,
                    width:100,
                    height:200,
                },
                'greenbox2':{
                    x:1400,
                    y:700,
                    width:100,
                    height:200,
                },
                
            },
            'infotext' : 'Press R to rotate the shape.',
            'text' : 'Left or right?'
        },
        'level4' : {
            'shapes' : {
                'pc5' : {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                }
            },
            'goals' : {
                'level4goal' : {
                    x: 500,
                    y: 150,
                    width: 200,
                    height: 900,
                }
            },
            'text' : 'Find the Median.'
        }
    }
}



function setup(){
    cnv = createCanvas(windowWidth,windowHeight)
    noLoop()
}

function draw(){
    stroke(0,0,0)
    textSize(30)
    strokeWeight(3)
    console.log(`Level: ${level}`)
    if(level === 0){
        level0()
    }
    else if(level === 1){
        level1()
    }
    else if(level === 2){
        level2()
    }
    else if(level === 3){
        level3()
    }
    else if(level === 4){
        level4()
    }
}

function mousePressed(){
    console.log(`Mouse pressed at [${mouseX},${mouseY}]`)
    
    currentShape = `pc${level + 1}`
    currentGoal = `level${level}goal`
    console.log(getQuadrant(currentShape,currentGoal))
    loop()
}
function mouseReleased(){
    console.log(`Mouse released at [${mouseX},${mouseY}]`)
    currentShape = `pc${level + 1}`
    currentGoal = `level${level}goal`
    lockToQuadrant(currentShape,currentGoal)
    noLoop()
}
function getSquareDetails(level,obj){
    if(obj != undefined){
        if(obj.includes('pc')){
            return [
                data['levelData'][`level${level}`]['shapes'][obj].x,
                data['levelData'][`level${level}`]['shapes'][obj].y,
                data['levelData'][`level${level}`]['shapes'][obj].width,
                data['levelData'][`level${level}`]['shapes'][obj].height,
            ] 
        }
        else if(obj.includes('goal') || obj.includes('box')){
            return [
                data['levelData'][`level${level}`]['goals'][obj].x,
                data['levelData'][`level${level}`]['goals'][obj].y,
                data['levelData'][`level${level}`]['goals'][obj].width,
                data['levelData'][`level${level}`]['goals'][obj].height,
            ]
        }
    }
    
    
}
function keyPressed(){
    var squareDetails = getSquareDetails(level, currentShape)
    var q = getQuadrant(currentShape,currentGoal)
    if(keyCode === 82){
        
        var x = squareDetails[3]
        var y = squareDetails[2]
        data.levelData[`level${level}`].shapes[`pc${level + 1}`].width = x
        data.levelData[`level${level}`].shapes[`pc${level + 1}`].height = y
    }
    
    if(keyCode === 13){
        if(squareDetails[2] > squareDetails[3]){
            lvlorientation = 'horizontal'
        }
        else{
            lvlorientation = 'vertical'
        }
        if(nextLevel === 1 && q[0] === 4 && q[1] === 2){
            level1(lvlorientation)
        }
        else if(nextLevel === 2 && q[0] === 6 && q[1] === 2){
            level2(lvlorientation)
        }
        else if(nextLevel === 3 && (q[0] === 0 && q[1] === 0) || nextLevel === 3 && (q[0] === 8 && q[1] === 0) || nextLevel === 3 && (q[0] === 0 && q[1] === 2)|| nextLevel === 3 && (q[0] === 8 && q[1] === 2)){
            level3(corner,lvlorientation)
        } 
        else if(nextLevel === 4 && q[0] === 0 && q[1] === 2 || q[0] === 9 && q[1] === 2) {
            console.log(getQuadrant(currentShape,currentGoal))
            if(q[0] === 0 && q[1] === 2){
                side = 'left'
            }
            else if(nextLevel === 4 && q[0] === 9 && q[1] === 2){
                side = 'right'
            }
            level4(side)
        }
        else if(nextLevel === 5 && q[0] === 0 && q[1] === 4){
            level5()
        }  
    }


}
function isMouseDownOver(obj,mx,my){
    if(mouseIsPressed){  
        var squareDetails = getSquareDetails(level, obj)
        if(mx > squareDetails[0] && mx < squareDetails[0] + squareDetails[2]){
            if(my > squareDetails[1] && my < squareDetails[1] + squareDetails[3]){
                mouseDownShapeTargeted = true
                return [true,obj]
            } 
        }
    }
    else{
        mouseDownShapeTargeted = false
    }
    return false
}

function getQuadrant(shape,goal){
    var goalDetails = getSquareDetails(level,goal)
    var squareDetails = getSquareDetails(level, shape)
    var column = Math.floor((squareDetails[0] - goalDetails[0])/100) 
    var row = Math.floor((squareDetails[1] - goalDetails[1])/100)
    if(column === 9){
        console.log(`[${column},${row}] (changed to [${column-1},${row}])`)
    }
    else{
        console.log(`[${column},${row}]`)
    }
    
    return [column,row]
}

function lockToQuadrant(x,y){
    var goalDetails = getSquareDetails(level,y)
    var squareDetails = getSquareDetails(level, x)
    var q = getQuadrant(currentShape,currentGoal)

    var column = q[0]
    var row = q[1]

    
    var path = data.levelData[`level${level}`].shapes[currentShape]
    // If the shape is dropped within the bounds of the goal
    // Looks like a mess but it works if you change any of the values which is what I was aiming for
    if(column >= 0 && row >= 0){
        // If the shape is in horizontal orientation
        if(squareDetails[2] > squareDetails[3]){
            if(column <= (goalDetails[2] / 100) - 1 && row <= (goalDetails[3] / 100) - 1){
                if(column === (goalDetails[2]/100) - 1){
                    path.x = goalDetails[0] + ((column - 1) * 100)
                    path.y = goalDetails[1] + (row * 100) 
                }
                else{
                    path.x = goalDetails[0] + (column * 100)
                    path.y = goalDetails[1] + (row * 100)
                }
            }
        }
        // If the shape is in vertical orientation
        else{
            if(column <= (goalDetails[2] / 100) - 1 && row <= (goalDetails[3] / 100) - 1){
                if(row === (goalDetails[3] / 100) - 1) { 
                    path.x = goalDetails[0] + (column * 100)
                    console.log('1')
                    path.y = goalDetails[1] + ((row-1) * 100)
                }
                else{
                    path.x = goalDetails[0] + (column * 100)
                    path.y = goalDetails[1] + ((row) * 100)
                }
                
            }
        }

        
        
    }
    // If the shape is dropped in the outer region to the left of the goal
    else if(column < 0 && row >= 0){
        path.x = goalDetails[0] + ((Math.abs(column) - 1) * 100)
        path.y = goalDetails[1] + (row * 100)   
    }

    // If the shape is dropped in the outer region to the upper left of the goal
    else if(column < 0 && row < 0){
        path.x = goalDetails[0]
        path.y = goalDetails[1]
    }
    // If the shape is dropped in the outer region above the goal
    else if(column >= 0 && column <= 9 && row < 0){
        if(squareDetails[2] > squareDetails[3]){
            if(column === (goalDetails[2]/100) - 1){
                path.x = goalDetails[0] + (Math.abs(column - 1)  * 100)
                path.y = goalDetails[1]
            }
            else{
                path.x = goalDetails[0] + (Math.abs(column)  * 100)
                path.y = goalDetails[1]
            }
        }
        else{
            if(column === (goalDetails[2]/100) - 1){
                path.x = goalDetails[0] + (Math.abs(column)  * 100)
                path.y = goalDetails[1]
            }
            else{
                path.x = goalDetails[0] + (Math.abs(column)  * 100)
                path.y = goalDetails[1]
            }
        }
    }
    // Checking if the shape is in position to start a level
    if(column === 4 && row === 2 && level === 0){
        nextLevel = 1
    }
    if(column === 6 && row == 2 && level === 1){
        nextLevel = 2
    }
    if(column === 0 && row === 0 && level === 2 || column === 8 && row === 0 && level === 2 || column === 8 && row === 2 && level === 2 || column === 0 && row === 2 && level === 2){
        nextLevel = 3
        console.log('23')
    }
    if(column === 0 && row === 2 && level === 3 || column === 9 && row === 2 && level === 3){
        nextLevel = 4
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

function grid(arr){
    let x = arr[0]
    let y = arr[1]
    let width = arr[2]
    let height = arr[3]
    stroke('#636363')
    for(let i = 0; i < (height / 100) - 1; i++){
        line(x+4,y + 100,x + width - 4, y+ 100)
        y += 100
    }
    y = arr[1]
    for(let i = 0; i < (width / 100) - 1; i++){
        line(x + 100,y + 4,x+ 100,y+height - 4)
        x += 100
    }
    stroke(0,0,0)
    
}
function level0(){
    level = 0
    nextLevel = 1
    background(51)
    var boxDetails = getSquareDetails(0,'pc1')
    var goalDetails = getSquareDetails(0,'level0goal')
    var gbd = getSquareDetails(0,'greenbox')
    fill('#03dbfc')
    strokeWeight(3)
    textSize(40)
    text(data.levelData.level0.text,1000,100)
    strokeWeight(5)
    fill('#1b619e')
    var goal = rect(goalDetails[0],goalDetails[1],goalDetails[2],goalDetails[3])
    strokeWeight(3)
    grid(goalDetails)
    fill(0,255,0)
    var gb = rect(gbd[0],gbd[1],gbd[2],gbd[3])
    fill(255,0,0)
    var pc1 = rect(boxDetails[0],boxDetails[1],boxDetails[2],boxDetails[3])
    isMouseDownOver('pc1', mouseX, mouseY)
    if(mouseDownShapeTargeted){
        data.levelData.level0.shapes.pc1.x = mouseX
        data.levelData.level0.shapes.pc1.y = mouseY
    }
    currentShape = 'pc1'
    currentGoal = 'level0goal'
}

function level1(orientation){
    clear()
    level = 1
    nextLevel = 2
    background(51)
    if(data.levelData.level1.shapes.pc2.x === 0){
        data.levelData.level1.shapes.pc2 = {
            x: 1700,
            y: 500,
            width: 200,
            height:100
        }
    }
    
    var boxDetails = getSquareDetails(1,'pc2')
    var goalDetails = getSquareDetails(1,'level1goal')
    
    
    
    fill('#03dbfc')
    strokeWeight(3)
    textSize(40)
    text(data.levelData.level1.text,1500,100)
    strokeWeight(5)
    
    fill('#1b619e')
    var goal = rect(goalDetails[0],goalDetails[1],goalDetails[2],goalDetails[3])
    strokeWeight(3)
    grid(goalDetails)
    fill(255,0,0)
    var pc1 = rect(boxDetails[0],boxDetails[1],boxDetails[2],boxDetails[3])
    isMouseDownOver('pc2', mouseX, mouseY)
    if(mouseDownShapeTargeted){
        data.levelData.level1.shapes.pc2.x = mouseX
        data.levelData.level1.shapes.pc2.y = mouseY
    }
}
function level2(orientation){
    clear()
    level = 2
    nextLevel = 3
    background(51)
    if(data.levelData.level2.shapes.pc3.x === 0){
        data.levelData.level2.shapes.pc3 = {
            x: 1700,
            y: 500,
            width: 200,
            height:100
        }
    }
    
    var boxDetails = getSquareDetails(2,'pc3')
    var goalDetails = getSquareDetails(2,'level2goal')
    
    
    
    fill('#03dbfc')
    strokeWeight(3)
    textSize(40)
    text(data.levelData.level2.text,1000,100)
    strokeWeight(5)
    
    fill('#1b619e')
    var goal = rect(goalDetails[0],goalDetails[1],goalDetails[2],goalDetails[3])
    strokeWeight(3)
    grid(goalDetails)
    fill(255,0,0)
    var pc1 = rect(boxDetails[0],boxDetails[1],boxDetails[2],boxDetails[3])
    isMouseDownOver('pc3', mouseX, mouseY)
    if(mouseDownShapeTargeted){
        data.levelData.level2.shapes.pc3.x = mouseX
        data.levelData.level2.shapes.pc3.y = mouseY
    }
}
function level3(corner,orientation){
    clear()
    level = 3
    nextLevel = 4
    background(51)
    if(data.levelData.level3.shapes.pc4.x === 0){
        data.levelData.level3.shapes.pc4 = {
            x: 1700,
            y: 500,
            width: 200,
            height:100
        }
    }
    
    var boxDetails = getSquareDetails(3,'pc4')
    var goalDetails = getSquareDetails(3,'level3goal')
    var gbd1 = getSquareDetails(3,'greenbox1')
    var gbd2 = getSquareDetails(3,'greenbox2')
    
    
    
    strokeWeight(3)
    textSize(40)
    fill(255,255,255)
    text(data.levelData.level3.infotext,250,100)
    fill('#03dbfc')
    text(data.levelData.level3.text,1500,100)
    strokeWeight(5)
    
    fill('#1b619e')
    var goal = rect(goalDetails[0],goalDetails[1],goalDetails[2],goalDetails[3])
    strokeWeight(3)
    grid(goalDetails)
    
    fill(0,255,0)
    var gb1 = rect(gbd1[0],gbd1[1],gbd1[2],gbd1[3])
    var gb2 = rect(gbd2[0],gbd2[1],gbd2[2],gbd2[3])
    fill(255,0,0)
    var pc1 = rect(boxDetails[0],boxDetails[1],boxDetails[2],boxDetails[3])
    isMouseDownOver('pc4', mouseX, mouseY)
    if(mouseDownShapeTargeted){
        data.levelData.level3.shapes.pc4.x = mouseX
        data.levelData.level3.shapes.pc4.y = mouseY
    }
}

function level4(orientation){
    clear()
    level = 4
    nextLevel = 5
    background(51)
    if(data.levelData.level4.shapes.pc5.x === 0){
        data.levelData.level4.shapes.pc5 = {
            x: 1700,
            y: 500,
            width: 200,
            height:100
        }
    }
    
    var boxDetails = getSquareDetails(4,'pc5')
    var goalDetails = getSquareDetails(4,'level4goal')

    strokeWeight(3)
    textSize(40)
    fill('#03dbfc')
    text(data.levelData.level4.text,1500,100)
    strokeWeight(5)
    
    fill('#1b619e')
    var goal = rect(goalDetails[0],goalDetails[1],goalDetails[2],goalDetails[3])
    strokeWeight(3)
    grid(goalDetails)
    
    fill(255,0,0)
    var pc1 = rect(boxDetails[0],boxDetails[1],boxDetails[2],boxDetails[3])
    isMouseDownOver('pc5', mouseX, mouseY)
    if(mouseDownShapeTargeted){
        data.levelData.level4.shapes.pc5.x = mouseX
        data.levelData.level4.shapes.pc5.y = mouseY
    }
}