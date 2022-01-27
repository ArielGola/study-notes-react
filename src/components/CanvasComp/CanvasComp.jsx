import React from 'react';
import { onDrawing } from './drawTool';

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
                onDrawing(
                    x, 
                    y, 
                    x2, 
                    y2, 
                    context, 
                    propsValues, 
                    curvePointX, 
                    curvePointY, 
                    middlePointX, 
                    middlePointY,
                    execFuncText()
                    );
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

    
    const whiteboard = (
        <canvas id='Canvas' width="1195" height="590" tabIndex="1"></canvas>
    );

    return (
        whiteboard
    );
}

export default CanvasComp;
