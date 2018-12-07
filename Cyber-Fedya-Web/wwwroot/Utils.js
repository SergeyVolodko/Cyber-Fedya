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

function waitForAuthorization(continuationCondition, onFinish) {
    setTimeout(function () {
        if (continuationCondition) {
            waitForAuthorization(!localStorage.getItem("is_authentication_handled"), onFinish);
        } else {
            onFinish();
        }
    }, 300);
};

function waitFor(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 200);
    }
    return new Promise(poll);
}

var StateMachine = function(transitions, initialState) {

    this.allTransitions = transitions;
    this.state = initialState;

    this.handleEvent = function (event, input) {

        var currentState = this.state;
        var transition = this.allTransitions.find(function(t) {
            return t.event === event &&
                   t.from === currentState;
        });

        if (!transition) {
            throw "Not existing transition";
        }
        this.state = transition.to;
        transition.successAction(input);
    }
}