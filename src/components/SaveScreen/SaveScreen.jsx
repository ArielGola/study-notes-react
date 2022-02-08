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

            let isFav = (document.getElementById('Fav').className).includes('active');

            const objectSave = {
                name: saveName.value,
                date: new Date(),
                base64: canvasBase64,
                fav: isFav
            };

            let notesLS = await JSON.parse(localStorage.getItem('notes'));
            if (notesLS === undefined || notesLS === null) {notesLS = []};

            await notesLS.push(objectSave);

            localStorage.setItem("notes", JSON.stringify(notesLS));
            console.log(notesLS);

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
