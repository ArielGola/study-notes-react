import React from 'react';

import { 
    showRange, 
    changeActive, 
    gridActive, 
    favActive, 
    handleShapes, 
    toolsObject
} from './WhiteboardFunctions';

import CanvasComp from '../CanvasComp/CanvasComp';

import './Whiteboard.css';


function Whiteboard() {

    const fontOptions = {
        fontSize: "",
        fontFamily: "",
        fontContent: ""
    };


    function returnToolObject() {return toolsObject};

    function returnTextOptions() {return fontOptions};

    return (
            <div className='full-height align-divs-canvas'>
                <div className='bg-dark-2 center-container-canvas'>
                    <div className='container-up-canvas'>
                        <div className='sizing-icons-canvas'>
                            <input 
                                type="color" 
                                className='input-color'
                                onInput={(e) => toolsObject.toolsOptions.color = e.target.value}
                            />
                            <i className="m-fas-w fas fa-brush fa-lg" onClick={(e) => showRange(e)}></i>
                            <i id='Pencil' className="m-fas-w fas fa-pen fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Line' className="m-fas-w fas fa-arrows-alt-h fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Eraser' className="m-fas-w fas fa-eraser fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Curve' className="m-fas-w fas fa-route fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='Shapes' className="m-fas-w fas fa-shapes fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i id='FontIcon' className="m-fas-w fas fa-font fa-lg" onClick={(e) => changeActive(e)}></i>
                            <i className="m-fas-w fas fa-border-all fa-lg" onClick={(e) => gridActive(e)}></i>
                            <i className="m-fas-w fas fa-save fa-lg"></i>
                            <i className="m-fas-w fas fa-file-download fa-lg"></i>
                            <i className="m-fas-w far fa-star fa-lg" onClick={(e) => favActive(e)}></i>
                        </div>

                        <div className='sizing-div-canvas'>
                            <CanvasComp 
                                toolObject={() => returnToolObject()} 
                                textOptions={() => returnTextOptions()} 
                            ></CanvasComp>
                        </div>

                    </div>

                    <div id='RangeDiv' className='display-off'>
                        <p>Thickness</p>
                        <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            defaultValue={1}
                            onInput={(e) => toolsObject.toolsOptions.thickness = Number(e.target.value)}
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
                        <input 
                            type="number" 
                            onChange={(e) => fontOptions.fontSize = (`${e.target.value}px`)} 
                        />
                        <label className='font-light'>Font familiy:</label>
                        <select 
                            name="font-family" 
                            id="FontFamily" 
                            onChange={(e) => fontOptions.fontFamily = e.target.value}
                        >
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
                        <label className='font-light'>Text content:</label>
                        <textarea 
                            cols="20" 
                            rows="5" 
                            onChange={(e) => fontOptions.fontCont = e.target.value}
                        ></textarea>
                    </div>

                </div>
                <div className='state-bar'>
                    <i id='Restore' className="m-fas-w fas fa-undo fa-lg"></i>
                    <p>Size: 654kb</p>
                    <p>Last saved 20:43</p>
                    <p>Saved 100%</p>
                </div>
            </div>
    )
}

export default Whiteboard;