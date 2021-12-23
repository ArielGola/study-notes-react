import React from 'react';

import './Whiteboard.css'


function Whiteboard() {
    return (
        <div className='full-height align-divs-canvas'>
            <div className='bg-dark-2 center-container-canvas'>
                <div className='container-up-canvas'>
                    <div className='sizing-icons-canvas'>
                        icons
                    </div>
                    <div className='sizing-div-canvas'>
                        <canvas width="820" height="405"></canvas>
                    </div>
                </div>
            </div>
            <div className='state-bar'>
                <p>Download</p>
                <p>Size: 654kb</p>
                <p>Last saved 20:43</p>
                <p>Saved 100%</p>
            </div>
        </div>
    )
}

export default Whiteboard;
