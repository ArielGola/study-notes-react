import React from 'react';
import { onDrawing } from './drawTool';

function CanvasComp(props) {

    var drawing = false;

    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;

    var curveX = [];
    var curveY = [];

    var widthCircle = [];
    var heightCircle = [];

    var statesCanvas = [];


    window.onload = () => {

        var canvas = document.getElementById('Canvas');
        var context = canvas.getContext('2d');
        var rect = canvas.getBoundingClientRect();

        
        canvas.addEventListener('mousedown', (e) => mousedownF(e, rect));

        canvas.addEventListener('mousemove', (e) => mousemoveF(e, context, rect));
        
        canvas.addEventListener('mouseup', (e) => mouseupF(e, rect, context, canvas));

        canvas.addEventListener('mouseout', () => mouseoutF());


        document.getElementById('Restore').onclick = () => restoreBtn(canvas, context);

    };

    const toolsValues = () => { 
        const toolObject = props.toolObject;
        return toolObject();
    };

    const textValues = () => {
        const textOptions = props.textOptions;
        return textOptions();
    };


    const mousedownF = (e, rect) => {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        drawing = true;
        console.log("Down");
    };


    const mousemoveF = (e, context, rect) => {

        let propsValues = toolsValues();
        x2 = e.clientX - rect.left;
        y2 = e.clientY - rect.top;

        //console.log(x, y);
        //console.log(x2, y2);

        if (drawing === true) {
            if (propsValues.selectedTool.pencil || propsValues.selectedTool.eraser) {   
                onDrawing(x, y, x2, y2, context, propsValues);
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
                x2 = 0;
                y2 = 0;
                return;
            };
            if (propsValues.selectedTool.curve) {
                curveX.push(x2);
                curveY.push(y2);
                return;
            };
            if (propsValues.selectedShape.circle || propsValues.selectedShape.circleF) {
                widthCircle.push(x2);
                heightCircle.push(y2);
                return;
            };
        };
        console.log("Move");
    };


    const mouseupF = async (e, rect, context, canvas) => {
            
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
            let propsValues = toolsValues();
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
                textValues()
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

        console.log("Up");
        
        let base64canvas = await canvas.toDataURL();

        if (statesCanvas.length <= 5) {

            statesCanvas.push(base64canvas);
            //console.log(statesCanvas.length);
            return;

        } else if (statesCanvas.length > 5) { 

            statesCanvas.shift();
            statesCanvas.push(base64canvas);
            //console.log(statesCanvas.length);
            return;

        };
    };


    const mouseoutF = () => {
        drawing = false;
    };

            
    const restoreBtn = (canvas, context) => {
        let imgDone = beforeImage();
        imgDone.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(imgDone, 0, 0);
        };
    };

    
    const beforeImage = () => {
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