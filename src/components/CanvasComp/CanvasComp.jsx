import React, { useEffect } from 'react';

function CanvasComp(props) {

    useEffect(() => {

        var x = 0;
        var y = 0;
        var drawing = false;

        var canvas = document.getElementById('Canvas');
        console.log(canvas);
        var context = canvas.getContext('2d');
        console.log(context);
        var rect = canvas.getBoundingClientRect();
        console.log(rect);


        canvas.addEventListener('mousedown', (e) => {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            drawing = true;
        })

        canvas.addEventListener('mousemove', (e) => {

            let x2 = e.clientX - rect.left;
            let y2 = e.clientY - rect.top;

            if (drawing === true) {
                drawAsPen(x, y, x2, y2, context);
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
        })

        canvas.addEventListener('mouseup', (e) => {

            let x2 = e.clientX - rect.left;
            let y2 = e.clientY - rect.top;

            if (drawing === true) {
                drawAsPen(x, y, x2, y2, context);
                x = 0;
                y = 0;
                drawing = false;
            }
        })

        canvas.addEventListener('mouseout', () => {
            drawing = false;
        })
        
    }, [])


    function drawAsPen(x1, y1, x2, y2, context) {
        let values = execFunc();
        context.beginPath();
        context.strokeStyle = values.color;
        context.lineWidth = values.thickness;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    };


    const execFunc = () => { 
        const func = props.func;
        return func();
    }   

    
    const whiteboard = (
        <canvas id='Canvas' width="1195" height="590"></canvas>
    )


    return (
        whiteboard
    )
}

export default CanvasComp;
