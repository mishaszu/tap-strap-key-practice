import {writable} from 'svelte/store';
import config from './config.json'

const getRandom = array => {
    const r1 = Math.random();
    const r2 = Math.random();
    return ({
        item: array[Math.floor(Math.random() * array.length)],
        xAxis: (size) => Math.floor(r1 * size),
        yAxis: (size) => Math.floor(r2 * size)
    })
}

const getUniqueRandom = (array, size, values = [], ommit = []) => {
    const random = getRandom(array);
    if (array.length === values.length || values.length >= size) {
        return values;
    } else {
        return getUniqueRandom(array.filter(({key}) => key !== random.item.key), size, values.concat(random), ommit);
    }
}


// - freq
// - values


const keyset = writable({freq: {}, values: getUniqueRandom(config, 4)});

export default {
    subscribe: keyset.subscribe,
    click: (clickKeyCode) => keyset.update(s => {
        if (s.values.some(v => v.item.keyCode === clickKeyCode)) {
            const hit = s.values.find(v => v.item.keyCode === clickKeyCode);
            const newFreq = {...s.freq, [hit.key]: s.freq[hit.key] !== undefined ? s.freq[hit.key] + 1 : 1}
            const newValues = s.values.filter(v => v.item.keyCode !== clickKeyCode);
            if (newValues.length === 0) {
                return {freq: newFreq, values: getUniqueRandom(config, 4)}
            }
            return {freq: newFreq, values: newValues};
        } else {
            return s;
        }
    })
}
