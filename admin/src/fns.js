export const displayDate = (timestamp) => {
    const t = new Date(timestamp)
    return `${t.toLocaleDateString()} ${t.toLocaleTimeString('en-AU')}`;
};


export const isIterable = (input) => {
    if (input === null || input === undefined) {
        return false
    }

    return typeof input[Symbol.iterator] === 'function'
}