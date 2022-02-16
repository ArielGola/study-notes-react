import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Navigation.css';

function Navigation() {

    useEffect(() => {
        localStorage.setItem('darkTheme', true);
    }, []);
    

    const navigate = useNavigate();

    const [themeCounter, setThemeCounter] = useState(1);
    const [userCounter, setUserCounter] = useState(1);

    function darkThemeOff() {
        localStorage.setItem('darkTheme', false);
    };

    function darkThemeOn() {
        localStorage.setItem('darkTheme', true);
    };

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
            dropTheme.className = "dropdown-user bg-dark-t display-on";
        } else {
            dropTheme.className = "display-off";
        }

    }

    return (
        <Fragment>
            <nav className='nav-container bg-dark'>
                <div className='align-icons'>
                    <i className="i-dark fas fa-house-user fa-lg" onClick={() => navigate("/home")}></i>
                    <i className="i-dark fas fa-folder-plus fa-lg" onClick={() => navigate("/whiteboard/new")}></i>
                    <i className="i-dark fas fa-sticky-note fa-lg" onClick={() => navigate("/saves")}></i>
                    <i className="i-dark fas fa-adjust fa-lg" onClick={() => turnDisplayTheme()}></i>
                    <i className="i-dark fas fa-user fa-lg" onClick={() => turnDisplayUserConfig()}></i>
                </div>
            </nav>
            <div id='ThemeConfig' className='dropdown-theme display-off'>
                <p className='light-theme' onClick={() => darkThemeOff()}>Light Theme</p>
                <p className='dark-theme' onClick={() => darkThemeOn()}>Dark Theme</p>
            </div>
            <div id='UserOptions' className='dropdown-user display-off'>
                <p className='user-action bg-dark-t'>Sign In</p>
                <p className='user-action bg-dark-t'>Sign Up</p>
                <p className='user-action bg-dark-t'>Logout</p>
            </div>
        </Fragment>
    )
}

export default Navigation;