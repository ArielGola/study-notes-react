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

    if (propsValues.selectedTool.pencil) return asPencil(x1, y1, x2, y2, context, propsValues);
    if (propsValues.selectedTool.line) return asLine(x1, y1, x2, y2, context, propsValues);
    if (propsValues.selectedTool.eraser) return asEraser(x1, y1, x2, y2, context, propsValues);
    if (propsValues.selectedTool.curve) return asCurve(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY);
    if (propsValues.selectedTool.text) return asText(x1, y1, x2, context, propsValues, execFuncText);
    if (propsValues.selectedShape) {
        let fill;
        if (propsValues.selectedShape.square) {
            fill = false;
            asSquare(x1, y1, x2, y2, context, propsValues, fill);
        }
        if (propsValues.selectedShape.squareF) {
            fill = true;
            asSquare(x1, y1, x2, y2, context, propsValues, fill);
        }
        if (propsValues.selectedShape.circle) {
            fill = false;
            asCircle(x1, y1, x2, y2, context, propsValues, fill, middlePointX, middlePointY);
        }
        if (propsValues.selectedShape.circleF) {
            fill = true;
            asCircle(x1, y1, x2, y2, context, propsValues, fill, middlePointX, middlePointY);
        }
    }
};


function asPencil(x1, y1, x2, y2, context, propsValues) {
    context.beginPath();
    context.strokeStyle = propsValues.color;
    context.lineWidth = propsValues.thickness;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
    return context;
};


function asLine(x1, y1, x2, y2, context, propsValues) {
    context.beginPath();
    context.strokeStyle = propsValues.color;
    context.lineWidth = propsValues.thickness;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
    return context;
};


function asEraser(x1, y1, x2, y2, context, propsValues) {
    context.beginPath();
    context.strokeStyle = "#464646";
    context.lineWidth = propsValues.thickness * 3;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
    return context;
};


function asCurve(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY) {
    context.beginPath();
    context.strokeStyle = propsValues.color;
    context.lineWidth = propsValues.thickness;
    context.moveTo(x1, y1);
    context.quadraticCurveTo(curvePointX, curvePointY, x2, y2);
    console.log(x1, y1, x2, y2);
    context.stroke();
    context.closePath();
    return context;
};


function asSquare(x1, y1, x2, y2, context, propsValues, fill) {
    context.beginPath();
    context.strokeStyle = propsValues.color;
    context.lineWidth = propsValues.thickness;
    if (fill) {
        context.fillStyle = propsValues.color;
        context.fillRect(x1, y1, x2-x1, y2-y1);
    }
    if (!fill) {
        context.rect(x1, y1, x2-x1, y2-y1);
    }
    context.stroke();
    context.closePath();
    return context;
};


function asCircle(x1, y1, x2, y2, context, propsValues, fill) {
    let centerX = (x2 - x1) / 2;
    let centerY = (y2 - y1) / 2;
    if (centerX < 0) return centerX * -1;
    if (centerY < 0) return centerY * -1;
    console.log(centerX, centerY);
    context.beginPath();
    context.strokeStyle = propsValues.color;
    context.lineWidth = propsValues.thickness;
    if (fill) {
        context.fillStyle = propsValues.color;
        context.arc(centerX + x1, centerY + y1, (centerX + centerY) / 2, 0, 2 * Math.PI, false);
        context.fill();
    }
    if (!fill) {
        context.arc(centerX + x1, centerY + y1, (centerX + centerY) / 2, 0, 2 * Math.PI, false);
    }
    context.stroke();
    context.closePath();
    return context;
};


function asText(x1, y1, x2, context, propsValues, execFuncText) {
    let textPropsG = execFuncText;
    console.log(textPropsG);
    let width = x2-x1;
    if (textPropsG.fontCont === undefined) {
        textPropsG.fontCont = '';
    };
    context.beginPath();
    context.font = `${textPropsG.fontSize} ${textPropsG.fontFamily}`;
    context.fillStyle = propsValues.color;
    context.lineWidth = propsValues.thickness;
    context.textAlign = "left";
    context.fillText(textPropsG.fontCont, x1, y1, width);
    context.stroke();
    context.closePath();
    return context;
};