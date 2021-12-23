import React from 'react';
import { useNavigate } from 'react-router-dom';

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
                    <h1 className='title-sizing'>Welcome to TESchool!</h1>
                </div>
                <div>
                    <p className='p-text-sizing'>Hello userName, these are action for today :)</p>
                </div>
            </div>
            <div className='sizing-container-div-nv'>
                <div className='align-templates-container'>
                    <div className='format-template-card' onClick={newNote}>
                        <p>Create note</p>
                    </div>
                    <div className='format-template-card' onClick={template1}>
                        <p>Template 1</p>
                    </div>
                    <div className='format-template-card' onClick={template2}>
                        <p>Template 2</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeComp;
