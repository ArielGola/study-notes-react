import React from 'react';

import './Navigation.css';

function Navigation() {
    return (
        <nav className='nav-container bg-dark'>
            <div className='align-icons'>
                <i class="fas fa-house-user fa-lg"></i>
                <i class="fas fa-sticky-note fa-lg"></i>
                <i class="fas fa-folder-plus fa-lg"></i>
                <i class="fas fa-star fa-lg"></i>
                <i class="fas fa-pen fa-lg"></i>
            </div>
        </nav>
    )
}

export default Navigation;