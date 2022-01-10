import React, { useEffect } from 'react';

function CanvasComp(props) {

    const execFunc = () => { 
        const func = props.func;
        return func();
    };

    useEffect(() => {

        var x = 0;
        var y = 0;
        var x2 = 0;
        var y2 = 0;
        var drawing = false;
        
        var propsValues;

        var curveX = [];
        var curveY = [];

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
            }
        })

        canvas.addEventListener('mouseup', (e) => {
            propsValues = execFunc();
            
            x2 = e.clientX - rect.left;
            y2 = e.clientY - rect.top;
            
            let itemX = Number((curveX.length / 2).toFixed());
            let itemY = Number((curveY.length / 2).toFixed());

            let curvePointX = curveX[itemX];
            let curvePointY = curveY[itemY];


            if (drawing === true) {
                onDrawing(x, y, x2, y2, context, propsValues, curvePointX, curvePointY);
                x = 0;
                y = 0;
                x2 = 0;
                y2 = 0;
                drawing = false;
            }

            curveX = [];
            curveY = [];
        })

        canvas.addEventListener('mouseout', () => {
            drawing = false;
        })
        
    }, [])

    function onDrawing(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY) {
        if (propsValues.selectedTool.pencil) asPencil(x1, y1, x2, y2, context, propsValues);
        if (propsValues.selectedTool.line) asLine(x1, y1, x2, y2, context, propsValues);
        if (propsValues.selectedTool.eraser) asEraser(x1, y1, x2, y2, context, propsValues);
        if (propsValues.selectedTool.curve) asCurve(x1, y1, x2, y2, context, propsValues, curvePointX, curvePointY);
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
        context.lineWidth = propsValues.thickness * 2;
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

    
    const whiteboard = (
        <canvas id='Canvas' width="1195" height="590"></canvas>
    )

    return (
        whiteboard
    )
}

export default CanvasComp;
