export function onDrawing(
    x1, 
    y1, 
    x2, 
    y2, 
    context, 
    propsValues, 
    curvePointX, 
    curvePointY, 
    middlePointX, 
    middlePointY,
    execFuncText
    ) {

    if (propsValues.tools.pencil) return asPencil(x1, y1, x2, y2, context, propsValues);
    if (propsValues.tools.line) return asLine(x1, y1, x2, y2, context, propsValues);
    if (propsValues.tools.eraser) return asEraser(x1, y1, x2, y2, context, propsValues);
    if (propsValues.tools.curve) return asCurve(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY);
    if (propsValues.tools.text) return asText(x1, y1, x2, context, propsValues, execFuncText);
    if (propsValues.tools.shapes) {
        if (propsValues.tools.shapes.square) return asSquare(x1, y1, x2, y2, context, propsValues, false);
        if (propsValues.tools.shapes.squareF) return asSquare(x1, y1, x2, y2, context, propsValues, true);
        if (propsValues.tools.shapes.circle) return asCircle(x1, y1, x2, y2, context, propsValues, false, middlePointX, middlePointY);
        if (propsValues.tools.shapes.circleF) return asCircle(x1, y1, x2, y2, context, propsValues, true, middlePointX, middlePointY);
    };
};


function asPencil(x1, y1, x2, y2, context, propsValues) {
    context.beginPath();
    context.strokeStyle = propsValues.toolsOptions.color;
    context.lineWidth = propsValues.toolsOptions.thickness;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
};


function asLine(x1, y1, x2, y2, context, propsValues) {
    context.beginPath();
    context.strokeStyle = propsValues.toolsOptions.color;
    context.lineWidth = propsValues.toolsOptions.thickness;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
};


function asEraser(x1, y1, x2, y2, context, propsValues) {
    let darkT = JSON.parse(localStorage.getItem('darkTheme'));
    let eraserColor = darkT ? "#464646" : "#BEBEBE"
    context.beginPath();
    context.strokeStyle = eraserColor;
    context.lineWidth = propsValues.toolsOptions.thickness * 3;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
};


function asCurve(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY) {
    context.beginPath();
    context.strokeStyle = propsValues.toolsOptions.color;
    context.lineWidth = propsValues.toolsOptions.thickness;
    context.moveTo(x1, y1);
    context.quadraticCurveTo(curvePointX, curvePointY, x2, y2);
    console.log(x1, y1, x2, y2);
    context.stroke();
    context.closePath();
};


function asSquare(x1, y1, x2, y2, context, propsValues, fill) {
    context.beginPath();
    context.strokeStyle = propsValues.toolsOptions.color;
    context.lineWidth = propsValues.toolsOptions.thickness;
    if (fill) {
        context.fillStyle = propsValues.toolsOptions.color;
        context.fillRect(x1, y1, x2-x1, y2-y1);
    }
    if (!fill) {
        context.rect(x1, y1, x2-x1, y2-y1);
    }
    context.stroke();
    context.closePath();
};


function asCircle(x1, y1, x2, y2, context, propsValues, fill) {
    let centerX = (x2 - x1) / 2;
    let centerY = (y2 - y1) / 2;
    context.beginPath();
    context.strokeStyle = propsValues.toolsOptions.color;
    context.lineWidth = propsValues.toolsOptions.thickness;
    if (fill) {
        context.fillStyle = propsValues.toolsOptions.color;
        context.arc(centerX + x1, centerY + y1, (centerX + centerY) / 2, 0, 2 * Math.PI, false);
        context.fill();
    }
    if (!fill) {
        context.arc(centerX + x1, centerY + y1, (centerX + centerY) / 2, 0, 2 * Math.PI, false);
    }
    context.stroke();
    context.closePath();
};


function asText(x1, y1, x2, context, propsValues, execFuncText) {
    let textPropsG = execFuncText();
    console.log(textPropsG);
    let width = x2-x1;
    if (textPropsG.fontCont === undefined) {
        textPropsG.fontCont = '';
    };
    context.beginPath();
    context.font = `${textPropsG.fontSize} ${textPropsG.fontFamily}`;
    context.fillStyle = propsValues.toolsOptions.color;
    context.lineWidth = propsValues.toolsOptions.thickness;
    context.textAlign = "left";
    context.fillText(textPropsG.fontCont, x1, y1, width);
    context.stroke();
    context.closePath();
};