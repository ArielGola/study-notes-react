import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SavedNotes.css';

function SavedNotes() {

    const navigate = useNavigate();

    useEffect(() => {

        getNotesLS();

    }, []);


    const [notesLS, setNotesLS] = useState(null);
    const [errorLS, setErrorLS] = useState(false);
    const [loader, setLoader] = useState(true);
    

    async function getNotesLS() {
        try {

            let notes = await JSON.parse(localStorage.getItem('notes'));

            if (notes === typeof null || notes === typeof undefined) {
                setErrorLS(true);
            } else {
                setNotesLS(notes);
            };

            setLoader(false);

        } catch (error) {
            setErrorLS(true);
            console.log(error);
        };
    }


    function unFav(element) {

        const arrayIndex = notesLS.indexOf(element);
        let newFavValue;
        if (element.fav === false) {
            newFavValue = true;
        };
        if (element.fav === true) {
            newFavValue = false;
        };

        const copyNotesLS = notesLS;

        copyNotesLS[arrayIndex] = {
            name: element.name,
            date: element.date,
            base64: element.base64,
            fav: newFavValue
        };

        setNotesLS(copyNotesLS);
        localStorage.setItem('notes', JSON.stringify(copyNotesLS));

        getNotesLS();
    };


    function removeItemSaved(element) {
        const arrayIndex = notesLS.indexOf(element);

        const copyNotesLS = notesLS;
        copyNotesLS.splice(arrayIndex, 1);

        setNotesLS(copyNotesLS);
        localStorage.setItem('notes', JSON.stringify(copyNotesLS));

        getNotesLS();
    };


    if (loader) {
        return (
            <div className='full-height'>
                Loader
            </div>
        );
    } else if (errorLS) { // Change it
        return (
            <div className='full-height'>
                Error
            </div>
        )
    } else {
        return (
            <div className='full-height bg-dark-2'>
                {
                    notesLS ? 
                    <div className="saveds-container">
                        <div className='saveds-title'>
                            <h3>Your saved studies notes...</h3>
                        </div>
                        <div className='notes-saveds-container'>
                            {
                                notesLS.map(note => 
                                    <div className="note-saved-card" key={notesLS.indexOf(note)}>
                                        <img 
                                            src={note.base64} 
                                            alt={note.name}  
                                            className='saved-img-note' 
                                            onClick={() => navigate(`/whiteboard/${note.name}`)}
                                        />
                                        <div className='note-sub-card'>
                                            <p>{note.name}</p>
                                            <div className='icons-saves'>
                                                <i 
                                                    className={
                                                        `m-fas-w ${note.fav ? "fas" : "far"} fa-star fa-lg no-margin ${note.fav ? "active" : ""}`
                                                    }
                                                    onClick={() => unFav(note)}
                                                ></i>
                                                <i 
                                                    className="m-fas-w fas fa-times fa-lg no-margin"
                                                    onClick={() => removeItemSaved(note)}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    :
                    <div className="saveds-container">
                        <div className='saveds-title'>
                            <h3>You don't have saved studies notes...</h3>
                        </div>
                        <div className='notes-saveds-container'>
                            <div className="note-saved-card" onClick={() => navigate('/whiteboard/new')}>
                                <p>New Note</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default SavedNotes;
