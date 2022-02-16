import React from 'react';
import { useNavigate } from 'react-router-dom';

import Template1 from '../../images/Template1.png';
import Template2 from '../../images/Template2.png';
import NewNote from '../../images/NewNote.png';

import './HomeComp.css';

function HomeComp() {

    const navigate = useNavigate();

    const newNote = () => {
        try {

            navigate("/whiteboard/newnote");
            
        } catch (error) {
            console.log(error.stack);
        }
    };

    const template1 = () => {
        try {
            
            navigate("/whiteboard/template1");

        } catch (error) {
            console.log(error.stack);
        }
    };

    const template2 = () => {
        try {
            
            navigate("/whiteboard/template2");

        } catch (error) {
            console.log(error.stack);
        }
    };

    return (
        <div className='full-height bg-dark-2'>
            <div className='header-sizing-nv'>
                <div>
                    <h1 className='title-sizing p-dark-35'>Welcome to TESchool!</h1>
                </div>
                <div>
                    <p className='p-text-sizing p-dark-35'>Hello userName, these are actions for today :)</p>
                </div>
            </div>
            <div className='sizing-container-div-nv'>
                <div className='align-templates-container'>
                    
                    <div className="note-saved-card bg-dark-45-t" onClick={newNote}>
                        <img src={NewNote} alt="imgTest" className='saved-img-note' />
                        <div className='note-sub-card'>
                            <p className='p-dark-35'>Create Note</p>
                        </div>
                    </div>

                    <div className="note-saved-card bg-dark-45-t" onClick={template1}>
                        <img src={Template1} alt="imgTest" className='saved-img-note' />
                        <div className='note-sub-card'>
                            <p className='p-dark-35'>Template 1</p>
                        </div>
                    </div>
                    
                    <div className="note-saved-card bg-dark-45-t" onClick={template2}>
                        <img src={Template2} alt="imgTest" className='saved-img-note' />
                        <div className='note-sub-card'>
                            <p className='p-dark-35'>Template 2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeComp;
