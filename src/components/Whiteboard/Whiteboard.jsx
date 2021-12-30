import React, { useState, useEffect } from 'react';

import './Whiteboard.css';


function Whiteboard() {

    const [pencilCounter, setPencilCounter] = useState(1);
    const [shapesCounter, setShapesCounter] = useState(1);
    const [fontCounter, setFontCounter] = useState(1);
    const [activeCounter, setActiveCounter] = useState(1);
    const [gridCouter, setGridCouter] = useState(1);
    const [favCounter, setFavCounter] = useState(1);

    const [fontSize, setFontSize] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    const [color, setColor] = useState("");
    const [thickness, setThickness] = useState(1);
    

    var canvas;
    var context;
    var rect;
    var x = 0;
    var y = 0;
    var drawing = false;

    useEffect(() => {
        function initCanvas() {
            canvas = document.getElementById('Canvas');
            console.log(canvas);
            context = canvas.getContext('2d');
            console.log(context);
            rect = canvas.getBoundingClientRect();
            console.log(rect);
        };

        function initEventsListeners() {

            canvas.addEventListener('mousedown', (e) => {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
                drawing = true;
            })
        
            canvas.addEventListener('mousemove', (e) => {
        
                let x2 = e.clientX - rect.left;
                let y2 = e.clientY - rect.top;
        
                if (drawing === true) {
                    drawAsPen(x, y, x2, y2);
                    x = e.clientX - rect.left;
                    y = e.clientY - rect.top;
                }
            })
        
            canvas.addEventListener('mouseup', (e) => {
        
                let x2 = e.clientX - rect.left;
                let y2 = e.clientY - rect.top;
        
                if (drawing === true) {
                    drawAsPen(x, y, x2, y2);
                    x = 0;
                    y = 0;
                    drawing = false;
                }
            })
        
            function drawAsPen(x1, y1, x2, y2) {
                context.beginPath();
                context.strokeStyle = color;
                context.lineWidth = thickness;
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.stroke();
                context.closePath();
            };
        };
        

        initCanvas();
        initEventsListeners();
    }, []);

    




    function showRange() {

        let newCount = pencilCounter + 1;
        setPencilCounter(newCount);

        let division = pencilCounter / 2;

        let rangeDiv = document.getElementById('RangeDiv');

        if (String(division).includes('.')) {
            rangeDiv.className = "range-div display-on";
        } else {
            rangeDiv.className = "display-off";
        }

    }


    function shapesSelect() {

        let newCount = shapesCounter + 1;
        setShapesCounter(newCount);

        let division = shapesCounter / 2;

        let shapesDiv = document.getElementById('ShapesDiv');

        if (String(division).includes('.')) {
            shapesDiv.className = "shapes-div display-on";
        } else {
            shapesDiv.className = "display-off";
        }

    }


    function selectFont() {

        let newCount = fontCounter + 1;
        setFontCounter(newCount);

        let division = fontCounter / 2;

        let fontDiv = document.getElementById('FontDiv');

        if (String(division).includes('.')) {
            fontDiv.className = "font-div display-on";
        } else {
            fontDiv.className = "display-off";
        }

        console.log(fontSize, fontFamily);
    }


    function changeActive(e) {

        let newCount = activeCounter + 1;
        setActiveCounter(newCount);

        let division = activeCounter / 2;

        let selected = e.target.id;
        let selectedClassName = e.target.className;

        let pencil = document.getElementById('Pencil');
        let line = document.getElementById('Line');
        let eraser = document.getElementById('Eraser');
        let curve = document.getElementById('Curve');

        if (selectedClassName.includes('active')) {

            let splited = selectedClassName.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            e.target.className = push;

        } else if (pencil.className.includes('active')) {

            let splited = pencil.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            pencil.className = push;

        } else if (line.className.includes('active')) {

            let splited = line.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            line.className = push;

        } else if (eraser.className.includes('active')) {

            let splited = eraser.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            eraser.className = push;

        } else if (curve.className.includes('active')) {

            let splited = curve.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            curve.className = push;

        };


        if (String(division).includes('.') && selected === pencil.id) {
            pencil.className = `${pencil.className} active`; 
        } else if (String(division).includes('.') && selected === line.id) {
            line.className = `${line.className} active`;
        } else if (String(division).includes('.') && selected === eraser.id) {
            eraser.className = `${eraser.className} active`;
        } else if (String(division).includes('.') && selected === curve.id) {
            curve.className = `${curve.className} active`;
        }

    }; // Ver si es mejor reemplazar estos if por whiles


    function gridActive(e) {
        let newCount = gridCouter + 1;
        setGridCouter(newCount);

        let division = gridCouter / 2;

        let gridIcon = e.target;

        if (String(division).includes('.')) {
            gridIcon.className = "m-fas-w fas fa-border-all fa-lg active";
        } else {
            gridIcon.className = "m-fas-w fas fa-border-all fa-lg";
        }
    };


    function favActive(e) {
        let newCount = favCounter + 1;
        setFavCounter(newCount);

        let division = favCounter / 2;

        let favIcon = e.target;

        if (String(division).includes('.')) {
            favIcon.className = "m-fas-w fas fa-star fa-lg";
        } else {
            favIcon.className = "m-fas-w far fa-star fa-lg";
        }
    }


    return (
            <div className='full-height align-divs-canvas'>
                <div className='bg-dark-2 center-container-canvas'>
                    <div className='container-up-canvas'>
                        <div className='sizing-icons-canvas'>
                            <input 
                                type="color" 
                                className='input-color'
                                onInput={(e) => setColor(e.target.value)}
                            />
                            <i className="m-fas-w fas fa-brush fa-lg" onClick={(e) => showRange(e)}></i>
                            <i id='Pencil' className="m-fas-w fas fa-pen fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Line' className="m-fas-w fas fa-arrows-alt-h fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Eraser' className="m-fas-w fas fa-eraser fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Curve' className="m-fas-w fas fa-route fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i className="m-fas-w fas fa-shapes fa-lg" onClick={() => shapesSelect()}></i>
                            <i className="m-fas-w fas fa-font fa-lg" onClick={() => selectFont()}></i>
                            <i className="m-fas-w fas fa-border-all fa-lg" onClick={(e) => gridActive(e)}></i>
                            <i className="m-fas-w fas fa-save fa-lg"></i>
                            <i className="m-fas-w fas fa-file-download fa-lg"></i>
                            <i className="m-fas-w far fa-star fa-lg" onClick={(e) => favActive(e)}></i>
                        </div>

                        <div className='sizing-div-canvas'>
                            <canvas id='Canvas' width="820" height="405"></canvas>
                        </div>

                    </div>

                    <div id='RangeDiv' className='display-off'>
                        <p>Thickness</p>
                        <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            defaultValue={thickness}
                            onInput={(e) => setThickness(Number(e.target.value))}
                        />
                    </div>

                    <div id='ShapesDiv' className='display-off'>
                        <i className="fas fa-circle fa-lg"></i>
                        <i className="far fa-circle fa-lg"></i>
                        <i className="fas fa-square fa-lg"></i>
                        <i className="far fa-square fa-lg"></i>
                    </div>

                    <div id='FontDiv' className='display-off'>
                        <label className='font-light'>Font size:</label>
                        <input type="number" onInput={(e) => setFontSize(e.target.value)} />
                        <label className='font-light'>Font familiy:</label>
                        <select name="font-family" id="FontFamily" onInput={(e) => setFontFamily(e.target.value)}>
                            <option value="Arial" style={{"fontFamily": "Arial"}}>Arial</option>
                            <option value="Helvetica" style={{"fontFamily": "Helvetica"}}>Helvetica</option>
                            <option value="Calibri" style={{"fontFamily": "Calibri"}}>Calibri</option>
                            <option value="Lucida Sans" style={{"fontFamily": "Lucida Sans"}}>Lucida Sans</option>
                            <option value="Franklin Gothic Medium" style={{"fontFamily": "Franklin Gothic Medium"}}>Franklin Gothic Medium</option>
                            <option value="Trebuchet MS" style={{"fontFamily": "Trebuchet MS"}}>Trebuchet MS</option>
                            <option value="Segoe UI" style={{"fontFamily": "Segoe UI"}}>Segoe UI</option>
                            <option value="Times New Roman" style={{"fontFamily": "Times New Roman"}}>Times New Roman</option>
                            <option value="Impact" style={{"fontFamily": "Impact"}}>Impact</option>
                            <option value="Courier New" style={{"fontFamily": "Courier New"}}>Courier New</option>
                            <option value="Segoe Script" style={{"fontFamily": "Segoe Script"}}>Segoe Script</option>
                            <option value="MV Boli" style={{"fontFamily": "MV Boli"}}>MV Boli</option>
                            <option value="Lucida Console" style={{"fontFamily": "Lucida Console"}}>Lucida Console</option>
                            <option value="Microsoft Tai Le" style={{"fontFamily": ""}}>Microsoft Tai Le</option>
                            <option value="San Serif" style={{"fontFamily": "San Serif"}}>San Serif</option>
                            <option value="MS PGothic" style={{"fontFamily": "MS PGothic"}}>MS PGothic</option>
                            <option value="Symbol" style={{"fontFamily": "Symbol"}}>Symbol</option>
                            <option value="Webdings" style={{"fontFamily": "Webdings"}}>Webdings</option>
                            <option value="Wingdings" style={{"fontFamily": "Wingdings"}}>Wingdings</option>
                        </select>
                    </div>

                </div>
                <div className='state-bar'>
                    <p>Download</p>
                    <p>Size: 654kb</p>
                    <p>Last saved 20:43</p>
                    <p>Saved 100%</p>
                </div>
            </div>
    )
}

export default Whiteboard;
