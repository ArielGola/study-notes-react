import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//import './Navigation.css';

//import '../../styles/texts.css';
//import '../../styles/backgrounds.css';
//import '../../styles/navigationFormat.css';

function Navigation() {

    useEffect(() => {

        if (!localStorage.getItem('darkTheme')) {
            localStorage.setItem('darkTheme', true);
        }

    }, []);

    let darkT = JSON.parse(localStorage.getItem('darkTheme'));
    

    const navigate = useNavigate();

    const [themeCounter, setThemeCounter] = useState(1);
    const [userCounter, setUserCounter] = useState(1);

    function darkThemeOff() {
        const confirmYes = window.confirm("Warning! If you change the theme, it will lost you're drawing right now. Are you sure?");
        if (confirmYes) {
            localStorage.setItem('darkTheme', false);
            window.location.reload();
        }
    };

    function darkThemeOn() {
        const confirmYes = window.confirm("Warning! If you change the theme, it will lost you're drawing right now. Are you sure?");
        if (confirmYes) {
            localStorage.setItem('darkTheme', true);
            window.location.reload();
        }
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
            <nav className={`nav-container ${darkT ? "bg-dark" : "bg-light"}`}>
                <div className='align-icons'>
                    <i 
                        className={`${darkT ? "i-dark" : "i-light"} fas fa-house-user fa-lg`} 
                        onClick={() => navigate("/home")}
                    ></i>
                    <i 
                        className={`${darkT ? "i-dark" : "i-light"} fas fa-folder-plus fa-lg`} 
                        onClick={() => navigate("/whiteboard/new")}
                    ></i>
                    <i 
                        className={`${darkT ? "i-dark" : "i-light"} fas fa-sticky-note fa-lg`}
                        onClick={() => navigate("/saves")}
                    ></i>
                    <i 
                        className={`${darkT ? "i-dark" : "i-light"} fas fa-adjust fa-lg`}
                        onClick={() => turnDisplayTheme()}
                    ></i>
                    <i 
                        className={`${darkT ? "i-dark" : "i-light"} fas fa-user fa-lg`}
                        onClick={() => turnDisplayUserConfig()}
                    ></i>
                </div>
            </nav>
            <div id='ThemeConfig' className='dropdown-theme display-off'>
                <p className='light-theme p-light' onClick={() => darkThemeOff()}>Light Theme</p>
                <p className='dark-theme p-dark' onClick={() => darkThemeOn()}>Dark Theme</p>
            </div>
            <div id='UserOptions' className='dropdown-user display-off'>
                <p className={`user-action ${darkT ? "p-dark bg-dark-t" : "p-light bg-light-t"}`}>
                    Contact with&nbsp;
                    <a className={`${darkT ? "p-dark" : "p-light"}`} href="https://github.com/ArielGola/" target="_blank">my Github</a>
                </p>
                <p className={`user-action ${darkT ? "p-dark bg-dark-t" : "p-light bg-light-t"}`}>
                    Contact with&nbsp;
                    <a className={`${darkT ? "p-dark" : "p-light"}`} href="https://www.linkedin.com/in/ariel-gola-497737215/" target="_blank">my Linkedin</a>
                </p>
                <p className={`user-action ${darkT ? "p-dark bg-dark-t" : "p-light bg-light-t"}`}>
                    Contact with&nbsp;
                    <a className={`${darkT ? "p-dark" : "p-light"}`} href="https://mail.google.com/mail/u/0/?hl=es-419#inbox?compose=CllgCJZZzSgjqCQnQxsnSHlNzrXgGlWBBgSNcQfClnQvRpkHmnbclpFFRqbbcQkbtNNBpWMcrbB" target="_blank">my email</a>
                </p>
            </div>
        </Fragment>
    )
}

export default Navigation;