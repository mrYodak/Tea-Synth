import React, { useContext, useEffect } from 'react';
import { CTX } from '../context/Store';
import QwertyHancock from 'qwerty-hancock';

const Keyboard = () => {
    const [appState, updateState] = useContext(CTX);

    useEffect(() => {
        const keyboard = new QwertyHancock({
            id: "keyboard",
            width: "450",
            height: "70",
            octaves: 2,
            startNote: "C3",
            whiteKeyColour: 'rgb(230, 201, 172)' ,
            blackKeyColour: 'rgb(18, 79, 64)',
            activeColour: 'rgb(219, 237, 114)',
            borderColour: 'rgb(100, 145, 74)'
        });
        keyboard.keyDown = (note, freq) => {
            updateState({ type: "MAKE_OSC", payload: { note, freq } });
        }
        keyboard.keyUp = (note, freq) => {
            updateState({ type: "KILL_OSC", payload: { note, freq } });
        }
    }, []);

    return (
        <div className='Keyboard'>
            <div id="keyboard"></div>
        </div>
    )
}

export default Keyboard