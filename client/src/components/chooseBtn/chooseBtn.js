import React from 'react';
import './chooseBtn.css';

function ChooseBtn(changeChosen) {
    return (
        <button onClick={() => changeChosen(false)} className={'card-btn'} />
    );
}

export default ChooseBtn;
