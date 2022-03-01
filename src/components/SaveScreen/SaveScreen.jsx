import React from 'react';


function SaveScreen(props) {

    let darkT = JSON.parse(localStorage.getItem('darkTheme'));

    const closeSSFunction = () => {
        const closeSS = props.closeFunction;
        closeSS();
    };

    const saveFunction = async () => {

        let saveName = document.getElementById('SaveName');

        if (saveName.value !== "") {

            let canvasSave = document.getElementById('Canvas');
            let canvasBase64 = await canvasSave.toDataURL();

            //let isFav = (document.getElementById('Fav').className).includes('active');

            const objectSave = {
                name: saveName.value,
                date: new Date(),
                base64: canvasBase64,
                fav: false
            };

            let notesLS = await JSON.parse(localStorage.getItem('notes'));
            if (notesLS === undefined || notesLS === null) {notesLS = []};

            await notesLS.push(objectSave);

            localStorage.setItem("notes", JSON.stringify(notesLS));

            closeSSFunction();
        }
    };

    return (
        <div className='ss-background'>
            <div className={`ss-card ${darkT ? "bg-dark-45" : "bg-light-210"}`}>
                <input id='SaveName' className='ss-input' type="text" name="save-name" placeholder='Write...'/>
                <div className="ss-buttons">
                    <button className={`btn-save bg-save ${darkT ? "bg-dark-70 p-dark" : "bg-light-170 p-light"}`} onClick={saveFunction}>Save</button>
                    <button className={`btn-cancel bg-cancel ${darkT ? "bg-dark-70 p-dark" : "bg-light-170 p-light"}`} onClick={closeSSFunction}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SaveScreen;
