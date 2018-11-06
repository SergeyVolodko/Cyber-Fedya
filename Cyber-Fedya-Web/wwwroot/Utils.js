function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function generateKey(pre) {
    return "" + pre + new Date().getTime();
}