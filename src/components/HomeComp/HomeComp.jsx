import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Template1 from '../../images/Template1.png';
import Template2 from '../../images/Template2.png';
import NewNote from '../../images/NewNote.png';


function HomeComp() {

    let darkT = JSON.parse(localStorage.getItem('darkTheme'));

    const navigate = useNavigate();

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoader(false);
    }, []);
    

    const newNote = () => {
        try {

            navigate("/whiteboard/newnote");
            
        } catch (error) {
            setError(true);
        }
    };

    const template1 = () => {
        try {
            
            navigate("/whiteboard/template1");

        } catch (error) {
            setError(true);
        }
    };

    const template2 = () => {
        try {
            
            navigate("/whiteboard/template2");

        } catch (error) {
            setError(true);
        }
    };


    if (loader) {
        return (
            <div className={`full-height ${darkT ? "bg-dark-2" : "bg-light-2"}`}>
                <div className="card-loader">
                    <div className="loader"></div>
                </div>
            </div>
        );
    } else {

        return (
            <div className={`full-height ${darkT ? "bg-dark-2" : "bg-light-2"}`}>
                <div className='header-sizing-nv'>
                    <div>
                        <h1 className={`title-sizing ${darkT ? "p-dark-35" : "p-light-210"}`}>
                            Welcome to NSchool!
                        </h1>
                    </div>
                    <div>
                        <p className={`p-text-sizing ${darkT ? "p-dark-35" : "p-light-210"}`}>
                            Hello, this is an app for draw and make your notes, these are actions for today :)
                        </p>
                    </div>
                </div>
                <div className='sizing-container-div-nv'>
                    <div className='align-templates-container'>
                        
                        <div className="note-saved-card bg-dark-45-t" onClick={newNote}>
                            <img src={NewNote} alt="imgTest" className='saved-img-note' />
                            <div className='note-sub-card'>
                                <p className="p-dark-35">Create Note</p>
                            </div>
                        </div>
    
                        <div className="note-saved-card bg-dark-45-t" onClick={template1}>
                            <img src={Template1} alt="imgTest" className='saved-img-note' />
                            <div className='note-sub-card'>
                                <p className="p-dark-35">Template 1</p>
                            </div>
                        </div>
                        
                        <div className="note-saved-card bg-dark-45-t" onClick={template2}>
                            <img src={Template2} alt="imgTest" className='saved-img-note' />
                            <div className='note-sub-card'>
                                <p className="p-dark-35">Template 2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default HomeComp;
