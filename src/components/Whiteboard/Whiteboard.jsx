import React, { Fragment, useState } from 'react';

import { showRange, changeActive, gridActive, handleShapes, toolsObject, downloadImg } from './WhiteboardFunctions';

import CanvasComp from '../CanvasComp/CanvasComp';
import SaveScreen from '../SaveScreen/SaveScreen';
import FontOptionsComp from '../FontOptionsComp/FontOptionsComp';

import './Whiteboard.css';


function Whiteboard() {

    const [saveScreen, setSaveScreen] = useState(false);

    let fontOptions = {
        fontSize: "",
        fontFamily: "",
        fontContent: ""
    };

    const closeSaveScreen = () => {setSaveScreen(false)};

    function returnToolObject() {return toolsObject};

    function returnTextOptions() {return fontOptions};

    function setFontOptions(dataFontOptions) {
        fontOptions = dataFontOptions;
        console.log(dataFontOptions);
    };

    return (
        <Fragment>
                
            {
                saveScreen ? <SaveScreen closeFunction={closeSaveScreen} /> : ""
            }
            
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
                            <i className="m-fas-w fas fa-save fa-lg" onClick={() => setSaveScreen(true)}></i>
                            <i className="m-fas-w fas fa-file-download fa-lg" onClick={() => downloadImg()}></i>
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

                    <FontOptionsComp onOptionsChange={setFontOptions} />

                </div>
                <div className='state-bar'>
                    <i id='Restore' className="m-fas-w fas fa-undo fa-lg"></i>
                    <p>
                        Current Theme: 
                        {
                            localStorage.getItem('darkTheme') ?
                            " Dark " : " Light "
                        }
                    </p>
                    <p>Last saved 20:43</p>
                    <p>Saved 100%</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Whiteboard;