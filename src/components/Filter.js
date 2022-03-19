import React, { useContext } from 'react'
import { CTX } from '../context/Store';

const Filter = () => {
    const [appState, updateState] = useContext(CTX);
    let { type, frequency, detune, Q, gain } = appState.filterBQSettings;

    const change = (e) => {
        let { id, value } = e.target;
        updateState({ type: 'CHANGE_FILTERBQ', payload: { id, value } });
    }

    const changeType = (e) =>{
        let{id} = e.target;
        updateState({type:"CHANGE_FILTERBQ_TYPE", payload: {id}})
    }

    return (
        <div className='control'>
            <h2>Biqaud Filter</h2>

            <div className='param'>                
                <button id='lowpass' onClick={changeType} className={`${type === 'lowpass' && 'active'}`}>Lowpass</button>
                <button id="highpass" onClick={changeType} className={`${type === "highpass" && 'active'}`}>Highpass</button>
                <button id="notch" onClick={changeType} className={`${type === "notch" && 'active'}`}>Bandpass</button>
            </div>

            <div className='param'>
                <button id="lowshelf" onClick={changeType} className={`${type === "lowshelf" && 'active'}`}>Lowshelf</button>
                <button id="highshelf" onClick={changeType} className={`${type === "highshelf" && 'active'}`}>Highshelf</button>
            </div>
            <div className='param'>
                <h3>frequency</h3>
                <input onChange={change}
                    value={frequency}
                    max="10000"
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

            <div className='param'>
                <h3>Q</h3>
                <input onChange={change}
                    value={Q}
                    type="range"
                    max="10"
                    step="0.1"
                    id="Q" />
            </div>

            <div className='param'>
                <h3>gain</h3>
                <input onChange={change}
                    value={gain}
                    max="10"
                    type="range"
                    step="0.1"
                    id="gain" />
            </div>

        </div>
    )
}

export default Filter;