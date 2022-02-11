import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Navigation.css';

function Navigation() {

    const navigate = useNavigate();

    const [themeCounter, setThemeCounter] = useState(1);
    const [userCounter, setUserCounter] = useState(1);

    function turnDisplayTheme() {
        
        let newCount = themeCounter + 1;
        setThemeCounter(newCount);

        let division = themeCounter / 2;

        let dropTheme = document.getElementById('ThemeConfig');

        if (String(division).includes('.')) {
            dropTheme.className = "dropdown-theme display-on";
        } else {
            dropTheme.className = "display-off";
        }

    };

    function turnDisplayUserConfig() {

        let newCount = userCounter + 1;
        setUserCounter(newCount);

        let division = userCounter / 2;

        let dropTheme = document.getElementById('UserOptions');

        if (String(division).includes('.')) {
            dropTheme.className = "dropdown-user display-on";
        } else {
            dropTheme.className = "display-off";
        }

    }

    return (
        <Fragment>
            <nav className='nav-container bg-dark'>
                <div className='align-icons'>
                    <i className="fas fa-house-user fa-lg" onClick={() => navigate("/home")}></i>
                    <i className="fas fa-folder-plus fa-lg" onClick={() => navigate("/whiteboard/new")}></i>
                    <i className="fas fa-sticky-note fa-lg" onClick={() => navigate("/saves")}></i>
                    {
                    //<i className="fas fa-star fa-lg" onClick={() => navigate("/fauvorites")}></i>
                    }
                    <i className="fas fa-adjust fa-lg" onClick={() => turnDisplayTheme()}></i>
                    <i className="fas fa-user fa-lg" onClick={() => turnDisplayUserConfig()}></i>
                </div>
            </nav>
            <div id='ThemeConfig' className='dropdown-theme display-off'>
                <p className='light-theme'>Light Theme</p>
                <p className='dark-theme'>Dark Theme</p>
            </div>
            <div id='UserOptions' className='dropdown-user display-off'>
                <p className='user-action'>Sign In</p>
                <p className='user-action'>Sign Up</p>
                <p className='user-action'>Logout</p>
            </div>
        </Fragment>
    )
}

export default Navigation;