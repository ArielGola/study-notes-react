export const toolsObject = {
    toolsOptions: {
        color: "#ffff",
        thickness: 1
    },
    tools: {     
        pencil: false,
        line: false,
        eraser: false,
        curve: false,
        text: false,
        shapes: {
            squareF: false,
            square: false,
            circleF: false,
            circle: false
        }
    }
};


let pencilCounter = 1;
let shapesCounter = 1;
let activeCounter = 1;
let gridCounter = 1;
let favCounter = 1;


// Si es par (true) o si es impar (false)
function isEven(x) { return String(x/2).includes('.') ? false : true };


class ObjectTools {
    constructor(pencil, line, eraser, curve, text, shapes) {
        this.pencil = pencil;
        this.line = line;
        this.eraser = eraser;
        this.curve = curve;
        this.text = text;
        this.shapes = shapes;
    }
};


class SelectionShapes {
    constructor(squareF, square, circleF, circle) {
        this.squareF = squareF;
        this.square = square;
        this.circleF = circleF;
        this.circle = circle;
    }
};


export function showRange(e) {

    let newCount = pencilCounter + 1;
    pencilCounter = newCount;

    let rangeDiv = document.getElementById('RangeDiv');

    let thicknessIcon = e.target;

    if (isEven(pencilCounter)) {
        rangeDiv.className = "range-div display-on";
        thicknessIcon.className = "m-fas-w fas fa-brush fa-lg active";
    } else {
        rangeDiv.className = "display-off";
        thicknessIcon.className = "m-fas-w fas fa-brush fa-lg";
    }
};


export function gridActive(e) {
    let newCount = gridCounter + 1;
    gridCounter = newCount;

    let gridIcon = e.target;

    let canvasBG = document.getElementById('Canvas');

    if (isEven(gridCounter)) {
        gridIcon.className = "m-fas-w fas fa-border-all fa-lg active";
        canvasBG.className = "grid-dark";
    } else {
        gridIcon.className = "m-fas-w fas fa-border-all fa-lg";
        canvasBG.className = "";
    }
};


export function favActive(e) {
    let newCount = favCounter + 1;
    favCounter = newCount;

    let favIcon = e.target;

    if (isEven(favIcon)) {
        favIcon.className = "m-fas-w fas fa-star fa-lg";
    } else {
        favIcon.className = "m-fas-w far fa-star fa-lg";
    }
};


export function changeActive(e) {

    let newCount = activeCounter + 1;
    activeCounter = newCount;

    let selectE = e.target; 

    let pencil = document.getElementById('Pencil');
    let line = document.getElementById('Line');
    let eraser = document.getElementById('Eraser');
    let curve = document.getElementById('Curve');
    let shapes = document.getElementById('Shapes');
    let iconText = document.getElementById('FontIcon');
    
    let shapesDiv = document.getElementById('ShapesDiv');
    let fontDiv = document.getElementById('FontDiv');
    
    toolsObject.tools = new ObjectTools(false, false, false, false, false, false);

    disableActives(selectE, pencil, line, eraser, curve, shapes, iconText, shapesDiv, fontDiv);
    enableActives(selectE, pencil, line, eraser, curve, shapes, iconText, shapesDiv, fontDiv);

};


function disableActives(
    selectE,
    pencil, 
    line, 
    eraser, 
    curve, 
    shapes, 
    iconText, 
    shapesDiv, 
    fontDiv
) {

    if (selectE.className.includes('active')) {

        disableOneActive(selectE, shapesDiv, fontDiv, null);

    } else if (pencil.className.includes('active')) {

        disableOneActive(pencil, shapesDiv, null, null);

    } else if (line.className.includes('active')) {

        disableOneActive(line, shapesDiv, null, null);

    } else if (eraser.className.includes('active')) {

        disableOneActive(eraser, shapesDiv, null, null);

    } else if (curve.className.includes('active')) {

        disableOneActive(curve, shapesDiv, null, null);

    } else if (shapes.className.includes('active')) {

        disableOneActive(shapes, shapesDiv, null, null);

    } else if (iconText.className.includes('active')) {

        disableOneActive(null, null, fontDiv, iconText);

    };
};


function enableActives( 
    selected, 
    pencil, 
    line, 
    eraser, 
    curve, 
    shapes, 
    iconText, 
    shapesDiv, 
    fontDiv
) {

    if (isEven(activeCounter) && selected.id === pencil.id) {
        
        enableOneActive(pencil, [true, false, false, false, false, false], null, null);

    } else if (isEven(activeCounter) && selected.id === line.id) {
        
        enableOneActive(line, [false, true, false, false, false, false], null, null);

    } else if (isEven(activeCounter) && selected.id === eraser.id) {

        enableOneActive(eraser, [false, false, true, false, false, false], null, null);

    } else if (isEven(activeCounter) && selected.id === curve.id) {
        
        enableOneActive(curve, [false, false, false, true, false, false], null, null);

    } else if (isEven(activeCounter) && selected.id === shapes.id) {
        
        enableOneActive(shapes, [false, false, false, false, false, toolsObject.tools.shapes], shapesDiv, null);

    } else if (isEven(activeCounter) && selected.id === iconText.id) {

        enableOneActive(iconText, [false, false, false, false, true, false], null, fontDiv);

    };
};


function enableOneActive(tool, toolActive, shapesDiv, fontDiv) {
    if (shapesDiv) { shapesDiv.className = 'font-div display-on' };
    if (fontDiv) { fontDiv.className = 'font-div display-on' };
    tool.className = `${tool.className} active`;
    let i = toolActive;
    toolsObject.tools = new ObjectTools(i[0], i[1], i[2], i[3], i[4], i[5]);
};


function disableOneActive(tool, shapesDiv, fontDiv, iconText) {
    if (shapesDiv) { shapesDiv.className = "display-off"; };
    if (fontDiv) { fontDiv.className = 'display-off'; };
    if (iconText) { iconText.className = 'm-fas-w fas fa-font fa-lg'; };
    if (tool) {
        let splited = tool.className.split(' ');
        let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
        tool.className = push;
    };
};



export function handleShapes(e) {

    let newCount = shapesCounter + 1;
    shapesCounter = newCount;

    let selectE = e.target;

    let squareF = document.getElementById('SquareF');
    let square = document.getElementById('Square');
    let circleF = document.getElementById('CircleF');
    let circle = document.getElementById('Circle');

    let shapesDiv = document.getElementById('ShapesDiv');
    
    toolsObject.tools.shapes = new SelectionShapes(false, false, false, false);

    disableShapes(selectE, squareF, square, circleF, circle);
    enableShapes(selectE, squareF, square, circleF, circle, shapesDiv);
}


function enableShapes(selectE, squareF, square, circleF, circle, shapesDiv) {

    if (isEven(shapesCounter) && selectE.id === squareF.id) {

        enableOneShape(squareF, (true, false, false, false), shapesDiv);

    } else if (isEven(shapesCounter) && selectE.id === square.id) {

        enableOneShape(square, (false, true, false, false), shapesDiv);

    } else if (isEven(shapesCounter) && selectE.id === circleF.id) {

        enableOneShape(circleF, (false, false, true, false), shapesDiv);

    } else if (isEven(shapesCounter) && selectE.id === circle.id) {

        enableOneShape(circle, (false, false, false, true), shapesDiv);

    }
};


function disableShapes(selectE, squareF, square, circleF, circle) {
        
    if (selectE.className.includes('active')) {

        disableOneShape(selectE);

    } else if (squareF.className.includes('active')) {

        disableOneShape(squareF);

    } else if (square.className.includes('active')) {

        disableOneShape(square);

    } else if (circleF.className.includes('active')) {

        disableOneShape(circleF);

    } else if (circle.className.includes('active')) {

        disableOneShape(circle);

    }
};


function disableOneShape(toolToDisable) {
    let splited = toolToDisable.className.split(' ');
    let push = `${splited[0]} ${splited[1]} ${splited[2]}`;
    toolToDisable.className = push;
};


function enableOneShape(shapeSelect, shapeActive, shapeDiv) {
    if (shapeDiv) { shapeDiv.className = "display-off"; };
    shapeSelect.className = `${shapeSelect.className} active`;
    let i = shapeActive;
    toolsObject.tools.shapes = new SelectionShapes(i[0], i[1], i[2], i[3]);
};