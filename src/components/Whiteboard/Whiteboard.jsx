import React, { Fragment, useState } from 'react';

import { showRange, changeActive, gridActive, handleShapes, toolsObject, downloadImg } from './WhiteboardFunctions';

import CanvasComp from '../CanvasComp/CanvasComp';
import SaveScreen from '../SaveScreen/SaveScreen';
import FontOptionsComp from '../FontOptionsComp/FontOptionsComp';

//import './Whiteboard.css';

//import '../../styles/texts.css';
//import '../../styles/backgrounds.css';
//import '../../styles/whiteboardFormat.css';


function Whiteboard() {

    let darkT = JSON.parse(localStorage.getItem('darkTheme'));

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
                <div className={`${darkT ? "bg-dark-2" : "bg-light-2"} center-container-canvas`}>
                    <div className='container-up-canvas'>
                        <div className={`sizing-icons-canvas ${darkT ? "bg-dark-45" : "bg-light-210"}`}>
                            <input 
                                type="color" 
                                className='input-color'
                                onInput={(e) => toolsObject.toolsOptions.color = e.target.value}
                            />
                            <i className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-brush fa-lg`} onClick={(e) => showRange(e)}></i>
                            <i id='Pencil' className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-pen fa-lg`} onClick={(e) => changeActive(e)}></i>
                            <i id='Line' className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-arrows-alt-h fa-lg`} onClick={(e) => changeActive(e)}></i>
                            <i id='Eraser' className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-eraser fa-lg`} onClick={(e) => changeActive(e)}></i>
                            <i id='Curve' className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-route fa-lg`} onClick={(e) => changeActive(e)}></i>
                            <i id='Shapes' className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-shapes fa-lg`} onClick={(e) => changeActive(e)}></i>
                            <i id='FontIcon' className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-font fa-lg`} onClick={(e) => changeActive(e)}></i>
                            <i className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-border-all fa-lg`} onClick={(e) => gridActive(e)}></i>
                            <i className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-save fa-lg`} onClick={() => setSaveScreen(true)}></i>
                            <i className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-file-download fa-lg`} onClick={() => downloadImg()}></i>
                        </div>

                        <div className={`sizing-div-canvas ${darkT ? "bg-dark-70" : "bg-light-170"}`}>
                            <CanvasComp 
                                toolObject={() => returnToolObject()} 
                                textOptions={() => returnTextOptions()} 
                            ></CanvasComp>
                        </div>

                    </div>

                    <div id='RangeDiv' className='display-off'>
                        <p className={`${darkT ? "p-dark" : "p-light"}`}>Thickness</p>
                        <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            defaultValue={1}
                            onInput={(e) => toolsObject.toolsOptions.thickness = Number(e.target.value)}
                        />
                    </div>

                    <div id='ShapesDiv' className='display-off'>
                        <i id='CircleF' className={`${darkT ? "i-dark" : "i-light"} fas fa-circle fa-lg`} onClick={(e) => handleShapes(e)}></i>
                        <i id='Circle' className={`${darkT ? "i-dark" : "i-light"} far fa-circle fa-lg`} onClick={(e) => handleShapes(e)}></i>
                        <i id='SquareF' className={`${darkT ? "i-dark" : "i-light"} fas fa-square fa-lg`} onClick={(e) => handleShapes(e)}></i>
                        <i id='Square' className={`${darkT ? "i-dark" : "i-light"} far fa-square fa-lg`} onClick={(e) => handleShapes(e)}></i>
                    </div>

                    <FontOptionsComp onOptionsChange={setFontOptions} />

                </div>
                <div className={`state-bar ${darkT ? "bg-dark-45" : "bg-light-210"}`}>
                    <i id='Restore' className={`${darkT ? "i-dark" : "i-light"} m-fas-w fas fa-undo fa-lg`}></i>
                    <p className={`${darkT ? "p-dark" : "p-light"}`}>
                        Current Theme: 
                        {
                            darkT ?
                            " Dark " : " Light "
                        }
                    </p>
                    <p className={`${darkT ? "p-dark" : "p-light"}`}>Last saved 20:43</p>
                    <p className={`${darkT ? "p-dark" : "p-light"}`}>Saved 100%</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Whiteboard;