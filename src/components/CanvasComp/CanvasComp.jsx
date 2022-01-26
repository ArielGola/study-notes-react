import React from 'react';

function CanvasComp(props) {

    const execFunc = () => { 
        const func = props.func;
        return func();
    };

    const execFuncText = () => {
        const textFunc = props.textFunc;
        return textFunc();
    };
    
    var statesCanvas = [];

    //useEffect
    window.onload = () => {

        var x = 0;
        var y = 0;
        var x2 = 0;
        var y2 = 0;
        var drawing = false;
        
        var propsValues;

        var curveX = [];
        var curveY = [];

        var widthCircle = [];
        var heightCircle = [];

        var canvas = document.getElementById('Canvas');
        var context = canvas.getContext('2d');
        var rect = canvas.getBoundingClientRect();

        canvas.addEventListener('mousedown', (e) => {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            drawing = true;
        })

        canvas.addEventListener('mousemove', (e) => {
            propsValues = execFunc();
            x2 = e.clientX - rect.left;
            y2 = e.clientY - rect.top;

            if (drawing === true) {
                if (propsValues.selectedTool.pencil || propsValues.selectedTool.eraser) {   
                    onDrawing(x, y, x2, y2, context, propsValues);
                    x = e.clientX - rect.left;
                    y = e.clientY - rect.top;
                    x2 = 0;
                    y2 = 0;
                }
                if (propsValues.selectedTool.curve) {
                    curveX.push(x2);
                    curveY.push(y2);
                }
                if (propsValues.selectedShape.circle || propsValues.selectedShape.circleF) {
                    widthCircle.push(x2);
                    heightCircle.push(y2);
                }
            }
        })

        canvas.addEventListener('mouseup', async (e) => {

            x2 = e.clientX - rect.left;
            y2 = e.clientY - rect.top;

            
            let itemX = Number((curveX.length / 2).toFixed());
            let itemY = Number((curveY.length / 2).toFixed());

            let curvePointX = curveX[itemX];
            let curvePointY = curveY[itemY];


            let itemCircleX = Number((widthCircle.length / 2).toFixed());
            let itemCircleY = Number((heightCircle.length / 2).toFixed());

            let middlePointX = widthCircle[itemCircleX];
            let middlePointY = heightCircle[itemCircleY];

            if (drawing === true) {
                propsValues = execFunc();
                onDrawing(x, y, x2, y2, context, propsValues, curvePointX, curvePointY, middlePointX, middlePointY);
                x = 0;
                y = 0;
                x2 = 0;
                y2 = 0;
                drawing = false;
            }

            curveX = [];
            curveY = [];
            widthCircle = [];
            heightCircle = [];

            
            let base64canvas = await canvas.toDataURL();

            if (statesCanvas.length <= 5) {

                statesCanvas.push(base64canvas);
                console.log(statesCanvas.length);
                return;

            } else if (statesCanvas.length > 5) { 

                statesCanvas.shift();
                statesCanvas.push(base64canvas);
                console.log(statesCanvas.length);
                return;

            }
        })

        canvas.addEventListener('mouseout', () => {
            drawing = false;
        })

        const restoreBtn = document.getElementById('Restore');
        
        restoreBtn.onclick = () => {
            let imgDone = beforeImage();
            imgDone.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imgDone, 0, 0);
            };
        }

    }

    
    function beforeImage() {
        let lastImage = String(statesCanvas[statesCanvas.length-2]);
        if (statesCanvas.length > 1) {
            statesCanvas.pop();
            let base64Img = new Image();
            base64Img.src = lastImage;
            return base64Img;
        }
    };



    function onDrawing(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY, middlePointX, middlePointY) {
        //console.log(propsValues);
        if (propsValues.selectedTool.pencil) return asPencil(x1, y1, x2, y2, context, propsValues);
        if (propsValues.selectedTool.line) return asLine(x1, y1, x2, y2, context, propsValues);
        if (propsValues.selectedTool.eraser) return asEraser(x1, y1, x2, y2, context, propsValues);
        if (propsValues.selectedTool.curve) return asCurve(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY);
        if (propsValues.selectedTool.text) return asText(x1, y1, x2, context, propsValues);
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
    };

    function asLine(x1, y1, x2, y2, context, propsValues) {
        context.beginPath();
        context.strokeStyle = propsValues.color;
        context.lineWidth = propsValues.thickness;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    function asEraser(x1, y1, x2, y2, context, propsValues) {
        context.beginPath();
        context.strokeStyle = "#464646";
        context.lineWidth = propsValues.thickness * 3;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    function asCurve(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY) {
        context.beginPath();
        context.strokeStyle = propsValues.color;
        context.lineWidth = propsValues.thickness;
        context.moveTo(x1, y1);
        context.quadraticCurveTo(curvePointX, curvePointY, x2, y2);
        console.log(x1, y1, x2, y2);
        context.stroke();
        context.closePath();
    }

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
    }

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
    }

    function asText(x1, y1, x2, context, propsValues) {
        let textPropsG = execFuncText();
        console.log(textPropsG);
        //let textProps = propsValues.selectedTool.text;
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
    }

    
    const whiteboard = (
        <canvas id='Canvas' width="1195" height="590" tabIndex="1"></canvas>
    )

    return (
        whiteboard
    )
}

export default CanvasComp;
