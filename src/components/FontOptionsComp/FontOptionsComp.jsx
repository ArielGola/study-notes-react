import React from 'react';

function FontOptionsComp(props) {

    const fontOptions = {};

    return (
        <div id='FontDiv' className='display-off'>
            <label className='font-light'>Font size:</label>
            <input 
                type="number" 
                onChange={
                    (e) => {
                        fontOptions.fontSize = (`${e.target.value}px`);
                        props.onOptionsChange(fontOptions);
                    }
                } 
            />
            <label className='font-light'>Font familiy:</label>
            <select 
                name="font-family" 
                id="FontFamily" 
                onChange={
                    (e) => {
                        fontOptions.fontFamily = e.target.value;
                        props.onOptionsChange(fontOptions);
                    }
                }
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
                onChange={
                    (e) => {
                        fontOptions.fontCont = e.target.value;
                        props.onOptionsChange(fontOptions);
                    }
                }
            ></textarea>
        </div>
    );
};

export default FontOptionsComp;