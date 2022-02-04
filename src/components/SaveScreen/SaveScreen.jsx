import React from 'react';

import './SaveScreen.css'

function SaveScreen() {
  return (
    <div className='ss-background'>
        <div className="ss-card">
            <input className='ss-input' type="text" name="save-name"/>
            <div className="ss-buttons">
                <button className='btn-save'>Save</button>
                <button className='btn-cancel'>Cancel</button>
            </div>
        </div>
    </div>
  );
}

export default SaveScreen;
