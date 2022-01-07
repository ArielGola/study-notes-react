import React, { useEffect } from 'react';

var propsValues;

function CanvasComp(props) {

    const execFunc = () => { 
        const func = props.func;
        return func();
    };


    useEffect(() => {

        var x = 0;
        var y = 0;
        var drawing = false;

        var canvas = document.getElementById('Canvas');
        var context = canvas.getContext('2d');
        var rect = canvas.getBoundingClientRect();

        propsValues = execFunc();
        //console.log(propsValues);

        canvas.addEventListener('mousedown', (e) => {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            drawing = true;
        })

        canvas.addEventListener('mousemove', (e) => {
            let x2 = e.clientX - rect.left;
            let y2 = e.clientY - rect.top;

            if (drawing === true && propsValues.selectedTool.pencil) {
                onDrawing(x, y, x2, y2, context);
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
        })

        canvas.addEventListener('mouseup', (e) => {

            let x2 = e.clientX - rect.left;
            let y2 = e.clientY - rect.top;

            if (drawing === true) {
                onDrawing(x, y, x2, y2, context);
                x = 0;
                y = 0;
                drawing = false;
            }
        })

        canvas.addEventListener('mouseout', () => {
            drawing = false;
        })
        
    }, [])

    function onDrawing(x1, y1, x2, y2, context) {
        propsValues = execFunc();
        if (propsValues.selectedTool.pencil) asPencil(x1, y1, x2, y2, context, propsValues);
        if (propsValues.selectedTool.line) asLine(x1, y1, x2, y2, context, propsValues);
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

    
    const whiteboard = (
        <canvas id='Canvas' width="1195" height="590"></canvas>
    )

    return (
        whiteboard
    )
}

export default CanvasComp;
