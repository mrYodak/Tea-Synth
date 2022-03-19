import React from "react";
import Osc from "./Osc";

let actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator();
let gain1 = actx.createGain();
gain1.gain.value = 0.2;
let filterBQ = actx.createBiquadFilter();

osc1.connect(filterBQ);
filterBQ.connect(gain1)
gain1.connect(out);


const CTX = React.createContext();

export { CTX };

let nodes = [];

export function reducer(state, action) {
    let { id, value, note, freq } = action.payload || {};
    switch (action.type) {
        case 'MAKE_OSC':
            const newOsc = new Osc(actx, state.osc1Settings.type, freq, state.osc1Settings.detune,
                state.envelope, gain1);
            nodes.push(newOsc);
            console.log('make ', note, freq);
            return { ...state };
        case 'KILL_OSC':
            let newNodes = [];
            nodes.forEach(node => {
                if (Math.round(node.osc.frequency.value) === Math.round(freq)) {
                    node.stop();
                } else {
                    newNodes.push(node);
                }
            })
            nodes = newNodes;
            console.log('kill ', note, freq);
            return { ...state };
        case 'START_OSC':
            osc1.start();
            return { ...state };
        case 'STOP_OSC':
            osc1.stop();
            return { ...state };
        case 'CHANGE_OSC1':
            osc1[id].value = value;
            return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } };
        case 'CHANGE_OSC1_TYPE':
            osc1.type = id;
            return { ...state, osc1Settings: { ...state.osc1Settings, type: id } };
        case 'CHANGE_ADSR':            
            return { ...state, envelope: { ...state.envelope, [id]: Number(value) } };
        case 'CHANGE_FILTERBQ':
            filterBQ[id].value = value;
            return { ...state, filterBQSettings: { ...state.filterBQSettings, [id]: value } };
        case 'CHANGE_FILTERBQ_TYPE':
            filterBQ.type = id;
            return { ...state, filterBQSettings: { ...state.filterBQSettings, type: id } };
        default:
            console.log('reducer error. action: ', action);
            return { ...state };
    }
}

export default function Store(props) {
    const stateHook = React.useReducer(reducer, {
        osc1Settings: {
            frequency: osc1.frequency.value,
            detune: osc1.detune.value,
            type: osc1.type
        },
        filterBQSettings: {
            frequency: filterBQ.frequency.value,
            detune: filterBQ.detune.value,
            Q: filterBQ.Q.value,
            gain: filterBQ.gain.value,
            type: filterBQ.type
        },
        envelope: {
            attack: 0.005,
            decay: 0.01,
            sustain: 0.4,
            release: 0.4
        }
    });
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
}