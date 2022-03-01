import React, { useEffect, useState } from 'react';

import { onDrawing } from './drawTool';

import * as template1 from '../../images/Template1.png';
import * as template2 from '../../images/Template2.png';

function CanvasComp(props) {

    // Theme variable
    let darkT = JSON.parse(localStorage.getItem('darkTheme'));

    const [error, setError] = useState(false);

    // Variables for drawing
    var drawing = false;

    // Coordinates
    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;

    // Arrays of pair of points for draw curves
    var curveX = [];
    var curveY = [];

    // Arrays of pair of points for draw circles
    var widthCircle = [];
    var heightCircle = [];

    // Array for undo an action
    var statesCanvas = [];

    useEffect(() => {
        
        try {
            
            // Canvas variables
            var canvas = document.getElementById('Canvas');
            var context = canvas.getContext('2d');
            var rect = canvas.getBoundingClientRect();

            // Listeners
            canvas.addEventListener('mousedown', (e) => mousedownF(e, rect));

            canvas.addEventListener('mousemove', (e) => mousemoveF(e, context, rect));
            
            canvas.addEventListener('mouseup', (e) => mouseupF(e, rect, context, canvas));
    
            canvas.addEventListener('mouseout', () => mouseoutF());
    
            // Undo button
            document.getElementById('Restore').onclick = () => restoreBtn(canvas, context);
            
            // New draw or get a template
            templateOrSave(canvas, context);
            
        } catch (error) {
            setError(true);
        };

    }, []);
  
    // Tools object
    const toolsValues = () => { 
        const toolObject = props.toolObject;
        return toolObject();
    };

    // Text object
    const textValues = () => {
        const textOptions = props.textOptions;
        return textOptions();
    };

    // New draw or get a template
    function templateOrSave(canvas, context) {
        try {
        
            const url = window.location.pathname.split('/');
            if (url[2] === "template1" || url[2] === "template2") {
                loadTemplates(url, canvas, context);
            } else {
                loadSaves(url, canvas, context);
            };
            
        } catch (error) {
            setError(true);
        }
    };

    // Get a template
    const loadTemplates = (url, canvas, context) => {
        try {
        
            if (url[2] === "template1") {
                drawImg(canvas, context, template1.default);
            };
            if (url[2] === "template2") {
                drawImg(canvas, context, template2.default);
            };
            
        } catch (error) {
            setError(true);
        }
    };

    // Load template
    const loadSaves = async (url, canvas, context) => {
        try {
            
            const localStorageArray = await JSON.parse(localStorage.getItem('notes'));
            if (localStorageArray) {
                let noteFind = localStorageArray.find(note => note.name === url[2]);
                if (noteFind === undefined) { return drawImg(canvas, context, false) };
                drawImg(canvas, context, noteFind.base64);
            };
            
        } catch (error) {
            setError(true);
        }
    };

    // Draw templates
    const drawImg = (canvas, context, src) => {
        try {
      
            let imgNew = document.createElement('img');
            imgNew.width = canvas.width;
            imgNew.height = canvas.height;
            imgNew.src = src;

            imgNew.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imgNew, 0, 0);
            };
            
        } catch (error) {
            setError(true);
        }
    };

    // Mouse down listener function
    const mousedownF = (e, rect) => {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        drawing = true;
    };

    // Mouse move listener function
    const mousemoveF = (e, context, rect) => {
        try {

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
            
        } catch (error) {
            setError(true);
        }
    };

    // Mouse up listener function
    const mouseupF = async (e, rect, context, canvas) => {
        try {

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
            
        } catch (error) {
            setError(true);
        }
    };

    // Mouse out listener function
    const mouseoutF = () => {
        drawing = false;
    };

    // Undo button        
    const restoreBtn = (canvas, context) => {
        try {
            let imgDone = beforeImage();
            imgDone.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imgDone, 0, 0);
            };
        } catch (error) {
            setError(true);
        }
    };

    // Return undo image from array of images
    const beforeImage = () => {
        try {
            let lastImage = String(statesCanvas[statesCanvas.length-2]);
            if (statesCanvas.length > 1) {
                statesCanvas.pop();
                let base64Img = new Image();
                base64Img.src = lastImage;
                return base64Img;
            };
        } catch (error) {
            setError(true);
        };
    };

    
    const whiteboard = (
        <canvas id='Canvas' width="1195" height="590" tabIndex="1"></canvas>
    );

    if (error) {
        return (
            <div className={`whiteboard-size ${darkT ? "bg-dark-70" : "bg-light-170"}`}>
                <div className="error-center">
                    <h3 className={`${darkT ? "p-dark" : "p-light"}`}>
                        Sorry, there was an error with the data process.
                    </h3>
                    <h3 className={`${darkT ? "p-dark" : "p-light"}`}>
                        Try reload the page with "F5".
                    </h3>
                </div>
            </div>
        );
    } else {
        return (
            whiteboard
        );
    }
}

export default CanvasComp;