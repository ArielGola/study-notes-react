import React, { useState } from 'react';

import CanvasComp from '../CanvasComp/CanvasComp';

import './Whiteboard.css';

var color;
var thickness;
var tools;
var selectedShape;

function Whiteboard() {

    const [pencilCounter, setPencilCounter] = useState(1);
    const [shapesCounter, setShapesCounter] = useState(1);
    const [fontCounter, setFontCounter] = useState(1);
    const [activeCounter, setActiveCounter] = useState(1);
    const [gridCouter, setGridCouter] = useState(1);
    const [favCounter, setFavCounter] = useState(1);

    const [fontSize, setFontSize] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    //const [tools, setTools] = useState({});
    //const [color, setColor] = useState("#FFFF");
    //const [thickness, setThickness] = useState(5);


    function returnValues() {
        //console.log(color, thickness);
        //console.log(tools);
        return {
            color,
            thickness,
            selectedTool: tools
        };
    }
    

    function showRange(e) {

        let newCount = pencilCounter + 1;
        setPencilCounter(newCount);

        let division = pencilCounter / 2;

        let rangeDiv = document.getElementById('RangeDiv');

        let thicknessIcon = e.target;

        if (String(division).includes('.')) {
            rangeDiv.className = "range-div display-on";
            thicknessIcon.className = "m-fas-w fas fa-brush fa-lg active";
        } else {
            rangeDiv.className = "display-off";
            thicknessIcon.className = "m-fas-w fas fa-brush fa-lg";
        }

    }


    function shapesSelect(e) {

        let newCount = shapesCounter + 1;
        setShapesCounter(newCount);

        let division = shapesCounter / 2;

        let shapesDiv = document.getElementById('ShapesDiv');

        let shapesIcon = e.target;

        if (String(division).includes('.')) {
            shapesDiv.className = "shapes-div display-on";
            shapesIcon.className = "m-fas-w fas fa-shapes fa-lg active";
        } else {
            shapesDiv.className = "display-off";
            shapesIcon.className = "m-fas-w fas fa-shapes fa-lg";
        }

    }


    function selectFont(e) {

        let newCount = fontCounter + 1;
        setFontCounter(newCount);

        let division = fontCounter / 2;

        let fontDiv = document.getElementById('FontDiv');

        let fontIcon = e.target;

        if (String(division).includes('.')) {
            fontDiv.className = "font-div display-on";
            fontIcon.className = "m-fas-w fas fa-font fa-lg active";
        } else {
            fontDiv.className = "display-off";
            fontIcon.className = "m-fas-w fas fa-font fa-lg";
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
        let shapes = document.getElementById('Shapes');
        
        let shapesDiv = document.getElementById('ShapesDiv');

        tools = {
            pencil: false,
            line: false,
            eraser: false,
            curve: false,
            shapes: false
        };

        disableActives(e, selectedClassName, pencil, line, eraser, curve, shapes, shapesDiv);
        enableActives(division, selected, pencil, line, eraser, curve, shapes, shapesDiv);

    };


    function disableActives(e, selectedClassName, pencil, line, eraser, curve, shapes, shapesDiv) {

        if (selectedClassName.includes('active')) {

            let splited = selectedClassName.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            e.target.className = push;
            shapesDiv.className = "display-off";

        } else if (pencil.className.includes('active')) {

            let splited = pencil.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            pencil.className = push;
            shapesDiv.className = "display-off";

        } else if (line.className.includes('active')) {

            let splited = line.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            line.className = push;
            shapesDiv.className = "display-off";

        } else if (eraser.className.includes('active')) {

            let splited = eraser.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            eraser.className = push;
            shapesDiv.className = "display-off";

        } else if (curve.className.includes('active')) {

            let splited = curve.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            curve.className = push;
            shapesDiv.className = "display-off";

        } else if (shapes.className.includes('active')) {

            let splited = shapes.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
            shapes.className = push;
            shapesDiv.className = "display-off";

        }
    };

    function enableActives(division, selected, pencil, line, eraser, curve, shapes, shapesDiv) {

        if (String(division).includes('.') && selected === pencil.id) {
            pencil.className = `${pencil.className} active`;
            tools = {
                pencil: true,
                line: false,
                eraser: false,
                curve: false,
                shapes: false
            }; 
        } else if (String(division).includes('.') && selected === line.id) {
            line.className = `${line.className} active`;
            tools = {
                pencil: false,
                line: true,
                eraser: false,
                curve: false,
                shapes: false
            };
        } else if (String(division).includes('.') && selected === eraser.id) {
            eraser.className = `${eraser.className} active`;
            tools = {
                pencil: false,
                line: false,
                eraser: true,
                curve: false,
                shapes: false
            };
        } else if (String(division).includes('.') && selected === curve.id) {
            curve.className = `${curve.className} active`;
            tools = {
                pencil: false,
                line: false,
                eraser: false,
                curve: true,
                shapes: false
            };
        } else if (String(division).includes('.') && selected === shapes.id) {

            shapesDiv.className = "shapes-div display-on";
            shapes.className = `${shapes.className} active`;
            tools = {
                pencil: false,
                line: false,
                eraser: false,
                curve: false,
                shapes: selectedShape
            };
            
        }

    };


    function handleShapes(e) {

        let newCount = shapesCounter + 1;
        setShapesCounter(newCount);

        let division = shapesCounter / 2;

        let selectedCN = e.target.className;
        let selected = e.target.id;

        let squareF = document.getElementById('SquareF');
        let square = document.getElementById('Square');
        let circleF = document.getElementById('CircleF');
        let circle = document.getElementById('Circle');

        selectedShape = {
            squareF: false,
            square: false,
            circleF: false,
            circle: false
        };

        disableShapes(e, selectedCN, squareF, square, circleF, circle);
        enableShapes(selected, division, squareF, square, circleF, circle);
    }


    function enableShapes(selected, division, squareF, square, circleF, circle) {

        if (String(division).includes('.') && selected === squareF.id) {
            squareF.className = `${squareF.className} active`;
            selectedShape = {
                squareF: true,
                square: false,
                circleF: false,
                circle: false
            }; 
            console.log(squareF.className);
        } else if (String(division).includes('.') && selected === square.id) {
            square.className = `${square.className} active`;
            selectedShape = {
                squareF: false,
                square: true,
                circleF: false,
                circle: false
            }; 
        } else if (String(division).includes('.') && selected === circleF.id) {
            circleF.className = `${circleF.className} active`;
            selectedShape = {
                squareF: false,
                square: false,
                circleF: true,
                circle: false
            }; 
        } else if (String(division).includes('.') && selected === circle.id) {
            circle.className = `${circle.className} active`;
            selectedShape = {
                squareF: false,
                square: false,
                circleF: false,
                circle: true
            }; 
        }
    };


    function disableShapes(e, selectedCN, squareF, square, circleF, circle) {
            
        if (selectedCN.includes('active')) {

            let splited = selectedCN.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]}`;
            e.target.className = push;

        } else if (squareF.className.includes('active')) {

            let splited = squareF.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]}`;
            squareF.className = push;

        } else if (square.className.includes('active')) {

            let splited = square.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]}`;
            square.className = push;

        } else if (circleF.className.includes('active')) {

            let splited = circleF.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]}`;
            circleF.className = push;

        } else if (circle.className.includes('active')) {

            let splited = circle.className.split(' ');
            let push = `${splited[0]} ${splited[1]} ${splited[2]}`;
            circle.className = push;

        }
    };


    function gridActive(e) {
        let newCount = gridCouter + 1;
        setGridCouter(newCount);

        let division = gridCouter / 2;

        let gridIcon = e.target;

        let canvasBG = document.getElementById('Canvas');

        if (String(division).includes('.')) {
            gridIcon.className = "m-fas-w fas fa-border-all fa-lg active";
            canvasBG.className = "grid-dark";
        } else {
            gridIcon.className = "m-fas-w fas fa-border-all fa-lg";
            canvasBG.className = "";
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
                                //onInput={(e) => setColor(e.target.value)}
                                onInput={(e) => color = e.target.value}
                            />
                            <i className="m-fas-w fas fa-brush fa-lg" onClick={(e) => showRange(e)}></i>
                            <i id='Pencil' className="m-fas-w fas fa-pen fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Line' className="m-fas-w fas fa-arrows-alt-h fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Eraser' className="m-fas-w fas fa-eraser fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Curve' className="m-fas-w fas fa-route fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Shapes' className="m-fas-w fas fa-shapes fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i className="m-fas-w fas fa-font fa-lg" onClick={(e) => selectFont(e)}></i>
                            <i className="m-fas-w fas fa-border-all fa-lg" onClick={(e) => gridActive(e)}></i>
                            <i className="m-fas-w fas fa-save fa-lg"></i>
                            <i className="m-fas-w fas fa-file-download fa-lg"></i>
                            <i className="m-fas-w far fa-star fa-lg" onClick={(e) => favActive(e)}></i>
                        </div>

                        <div className='sizing-div-canvas'>
                            {/*<canvas id='Canvas' width="1195" height="590"></canvas>*/}
                            <CanvasComp func={() => returnValues()}></CanvasComp>
                        </div>

                    </div>

                    <div id='RangeDiv' className='display-off'>
                        <p>Thickness</p>
                        <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            defaultValue={1}
                            //onInput={(e) => setThickness(e.target.value)}
                            onInput={(e) => thickness = Number(e.target.value)}
                        />
                    </div>

                    <div id='ShapesDiv' className='display-off'>
                        <i id='CircleF' className="fas fa-circle fa-lg" onClick={(e) => handleShapes(e)}></i>
                        <i id='Circle' className="far fa-circle fa-lg" onClick={(e) => handleShapes(e)}></i>
                        <i id='SquareF' className="fas fa-square fa-lg" onClick={(e) => handleShapes(e)}></i>
                        <i id='Square' className="far fa-square fa-lg" onClick={(e) => handleShapes(e)}></i>
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
