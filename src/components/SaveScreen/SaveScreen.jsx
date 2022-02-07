import React from 'react';

import './SaveScreen.css'

function SaveScreen(props) {

    const closeSSFunction = () => {
        const closeSS = props.closeFunction;
        closeSS();
    };

    const saveFunction = async () => {
        let saveName = document.getElementById('SaveName');
        if (saveName.value !== "") {
            let canvasSave = document.getElementById('Canvas');
            let canvasBase64 = await canvasSave.toDataURL();

            const objectSave = {
                name: saveName.value,
                date: new Date(),
                base64: canvasBase64
            };

            localStorage.setItem(`${saveName.value}`, JSON.stringify(objectSave));
            console.log(objectSave);

            closeSSFunction();
        }
    };

    return (
        <div className='ss-background'>
            <div className="ss-card">
                <input id='SaveName' className='ss-input' type="text" name="save-name"/>
                <div className="ss-buttons">
                    <button className='btn-save' onClick={saveFunction}>Save</button>
                    <button className='btn-cancel' onClick={closeSSFunction}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SaveScreen;
