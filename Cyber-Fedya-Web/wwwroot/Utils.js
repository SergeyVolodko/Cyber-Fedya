function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function generateKey(pre) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    return "" + pre + guid;
}

// Required to make possible entering custom text to select
function select2CreateTag(params) {
    return {
        id: params.term,
        text: params.term,
        newOption: true
    }
}