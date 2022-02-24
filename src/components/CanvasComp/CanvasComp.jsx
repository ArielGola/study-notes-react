import React, { useEffect, useState } from 'react';
import { onDrawing } from './drawTool';

import * as template1 from '../../images/Template1.png';
import * as template2 from '../../images/Template2.png';

function CanvasComp(props) {

    const [error, setError] = useState(false);

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

    useEffect(() => {
        
        try {
            
            var canvas = document.getElementById('Canvas');
            var context = canvas.getContext('2d');
            var rect = canvas.getBoundingClientRect();

            canvas.addEventListener('mousedown', (e) => mousedownF(e, rect));

            canvas.addEventListener('mousemove', (e) => mousemoveF(e, context, rect));
            
            canvas.addEventListener('mouseup', (e) => mouseupF(e, rect, context, canvas));
    
            canvas.addEventListener('mouseout', () => mouseoutF());
    
    
            document.getElementById('Restore').onclick = () => restoreBtn(canvas, context);
            
    
            templateOrSave(canvas, context);
            
        } catch (error) {
            setError(true);
        };

    }, []);
  
    const toolsValues = () => { 
        const toolObject = props.toolObject;
        return toolObject();
    };

    const textValues = () => {
        const textOptions = props.textOptions;
        return textOptions();
    };


    function templateOrSave(canvas, context) {
        const url = window.location.pathname.split('/');
        if (url[2] === "template1" || url[2] === "template2") {
            loadTemplates(url, canvas, context);
        } else {
            loadSaves(url, canvas, context);
        };
    };

    
    const loadTemplates = (url, canvas, context) => {
        if (url[2] === "template1") {
            drawImg(canvas, context, template1.default);
        };
        if (url[2] === "template2") {
            drawImg(canvas, context, template2.default);
        };
    };


    const loadSaves = async (url, canvas, context) => {
        const localStorageArray = await JSON.parse(localStorage.getItem('notes'));
        let noteFind = localStorageArray.find(note => note.name === url[2]);
        drawImg(canvas, context, noteFind.base64);
    };


    const drawImg = (canvas, context, src) => {
        let imgNew = document.createElement('img');
        imgNew.width = canvas.width;
        imgNew.height = canvas.height;
        imgNew.src = src;

        imgNew.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(imgNew, 0, 0);
        };
    };


    const mousedownF = (e, rect) => {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        drawing = true;
    };


    const mousemoveF = (e, context, rect) => {

        let propsValues = toolsValues();
        x2 = e.clientX - rect.left;
        y2 = e.clientY - rect.top;

        if (drawing === true) {
            if (propsValues.tools.pencil || propsValues.tools.eraser) {   
                onDrawing(x, y, x2, y2, context, propsValues);
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
                x2 = 0;
                y2 = 0;
                return;
            };
            if (propsValues.tools.curve) {
                curveX.push(x2);
                curveY.push(y2);
                return;
            };
            if (propsValues.tools.shapes.circle || propsValues.tools.shapes.circleF) {
                widthCircle.push(x2);
                heightCircle.push(y2);
                return;
            };
        };
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
                textValues
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
            return;

        } else if (statesCanvas.length > 5) { 

            statesCanvas.shift();
            statesCanvas.push(base64canvas);
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

    if (error) { // Change it
        return (
            <div className='full-height'>
                Error
            </div>
        );
    } else {
        return (
            whiteboard
        );
    }
}

export default CanvasComp;