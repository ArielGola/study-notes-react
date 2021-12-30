import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SavedNotes.css';

function SavedNotes() {

    const navigate = useNavigate();

    useEffect(() => {

        function getNotesLS() {
            try {

                let notes = localStorage.getItem('notes');

                if (notes === null || notes === undefined) {
                    setErrorLS(true);
                } else {
                    setNotesLS(notes);
                };

                setLoader(false);

            } catch (error) {
                setErrorLS(true);
            };
        }

        getNotesLS();

    }, []);


    const [notesLS, setNotesLS] = useState(null);
    const [errorLS, setErrorLS] = useState(false);
    const [loader, setLoader] = useState(true);


    if (loader) {
        return (
            <div className='full-height'>
                Loader
            </div>
        );
    } else if (!errorLS) { // Change it
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
                            <div className="note-saved-card"><p>A</p></div>
                            <div className="note-saved-card"><p>B</p></div>
                            <div className="note-saved-card"><p>C</p></div>
                            <div className="note-saved-card"><p>D</p></div>
                            <div className="note-saved-card"><p>E</p></div>
                            <div className="note-saved-card"><p>F</p></div>
                            <div className="note-saved-card"><p>G</p></div>
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
