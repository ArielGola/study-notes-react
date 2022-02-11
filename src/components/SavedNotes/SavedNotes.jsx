import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SavedNotes.css';

function SavedNotes() {

    const navigate = useNavigate();

    useEffect(() => {

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
                                    <div className="note-saved-card">
                                        <img src={note.base64} alt="imgTest" className='saved-img-note' />
                                        <div className='note-sub-card'>
                                            <p>{note.name}</p>
                                            <div className='icons-saves'>
                                                <i className="m-fas-w far fa-star fa-lg no-margin"></i>
                                                <i className="m-fas-w fas fa-times fa-lg no-margin"></i>
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
