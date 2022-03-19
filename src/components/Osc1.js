import React, { useContext } from 'react'
import { CTX } from '../context/Store';

const Osc1 = () => {
    const [appState, updateState] = useContext(CTX);
    let { type, frequency, detune } = appState.osc1Settings;

    const change = (e) => {
        let { id, value } = e.target;
        updateState({ type: 'CHANGE_OSC1', payload: { id, value } });
    }

    const changeType = (e) =>{
        let{id} = e.target;
        updateState({type:"CHANGE_OSC1_TYPE", payload: {id}});
    }

    return (
        
        <div className='control'>
             <div className='param'>
            <button onClick={() => updateState({type:"START_OSC"})}>START</button>
            <button onClick={() => updateState({type:"STOP_OSC"})}>STOP</button>
            </div>
            <h2>Oscillator</h2>
            <div className='param'>
                <button id='sine' onClick={changeType} className={`${type === 'sine' && 'active'}`}>Sine</button>
                <button id="triangle" onClick={changeType} className={`${type === "triangle" && 'active'}`}>Tri</button>
                <button id="square" onClick={changeType} className={`${type === "square" && 'active'}`}>Quad</button>
                <button id="sawtooth" onClick={changeType} className={`${type === "sawtooth" && 'active'}`}>Saw</button>
            </div>
            <div className='param'>
                <h3>frequency</h3>
                <input onChange={change}
                    value={frequency}
                    max="5000"
                    type="range"
                    id="frequency" />
            </div>

            <div className='param'>
                <h3>detune</h3>
                <input onChange={change}
                    value={detune}
                    type="range"
                    id="detune" />
            </div>
        </div>
    )
}

export default Osc1;