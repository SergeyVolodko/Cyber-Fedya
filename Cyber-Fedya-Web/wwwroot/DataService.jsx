var STATES = Object.freeze({
    "OK": "OK",
    "Authorizing": "Authorizing",
    "DataFetching": "DataFetching",
    "TokenRevokation": "TokenRevokation",
    "SettingOfflineData": "SettingOfflineData",
    "GettingOfflineData": "GettingOfflineData",
    "Error": "Error"
});

var ReadDataEvents = Object.freeze({
    "StartGettingData": "StartGettingData",
    "AuthorizationSucceeded": "AuthorizationSucceeded",
    "DataFetchSucceeded": "DataFetchSucceeded",
    "SetOfflineDataSucceeded": "SetOfflineDataSucceeded",
    "GetOfflineDataSucceeded": "GetOfflineDataSucceeded",
    "AuthorizationFailed": "AuthorizationFailed",
    "DataFetchFailed": "DataFetchFailed",
    "GetOfflineDataFailed": "GetOfflineDataFailed",

    //"Error": "Error"
});

function clearStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('data');
}

class DataService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRepository: props.apiRepository
        };
        this.getData = this.getData.bind(this);

        ds = this;

        this.fsm = new StateMachine([
            { event: ReadDataEvents.StartGettingData,        from: STATES.OK,                 to: STATES.Authorizing,        successAction: ds.startAuthorization },
            { event: ReadDataEvents.AuthorizationSucceeded,  from: STATES.Authorizing,        to: STATES.DataFetching,       successAction: ds.startDataFetching },
            { event: ReadDataEvents.DataFetchSucceeded,      from: STATES.DataFetching,       to: STATES.SettingOfflineData, successAction: ds.setOfflineData },
            { event: ReadDataEvents.SetOfflineDataSucceeded, from: STATES.SettingOfflineData, to: STATES.GettingOfflineData, successAction: ds.getOfflineData },
            { event: ReadDataEvents.GetOfflineDataSucceeded, from: STATES.GettingOfflineData, to: STATES.OK,                 successAction: ds.returnData },

            { event: ReadDataEvents.AuthorizationFailed,     from: STATES.Authorizing,        to: STATES.GettingOfflineData, successAction: ds.getOfflineData },

            { event: ReadDataEvents.DataFetchFailed,         from: STATES.DataFetching,       to: STATES.GettingOfflineData, successAction: ds.getOfflineData },
            { event: ReadDataEvents.GetOfflineDataFailed,    from: STATES.GettingOfflineData, to: STATES.Error,              successAction: ds.finishFlowWithError }
            ],
            /*initial state:*/STATES.OK);
    }

    // OK -> Authorizing
    startAuthorization() {
        authorizationService.authorize(
            ds.handleSuccessfulAuthorization,
            ds.handleFailedAuthorization);
    }
    handleSuccessfulAuthorization() {
        ds.fsm.handleEvent(ReadDataEvents.AuthorizationSucceeded, null);
    }

    handleFailedAuthorization() {
        ds.fsm.handleEvent(ReadDataEvents.AuthorizationFailed, null);
    }

    reAuthorize() {
        alert("??");
    }

    // Authorizing -> DataFetching
    startDataFetching() {
        ds.state.apiRepository
            .getRequest("everything", ds.handleFetchedData, ds.handleFetchFailure);
    }
    handleFetchedData(data) {
        ds.fsm.handleEvent(ReadDataEvents.DataFetchSucceeded, data);
    }
    handleFetchFailure() {
        ds.fsm.handleEvent(ReadDataEvents.DataFetchFailed, null);
    }

    // DataFetching -> SettingOfflineData
    setOfflineData(data) {
        localStorage.setItem("data", JSON.stringify(data));
        ds.fsm.handleEvent(ReadDataEvents.SetOfflineDataSucceeded, null);
    }

    // SettingOfflineData -> GettingOfflineData
    getOfflineData() {
        try {
            var data = JSON.parse(localStorage.getItem("data"));
            if (!data) throw "No local data!";
            ds.fsm.handleEvent(ReadDataEvents.GetOfflineDataSucceeded, data);
        }
        catch (e) {
            ds.fsm.handleEvent(ReadDataEvents.GetOfflineDataFailed, null);
        }
    }

    returnData(data) {
        dataResult = data;
    }

    finishFlowWithError() {
        location.pathname = "/error.html";
    }

    dataResult = null;

    // cache revocation ?
    // sync-button ?
    componentDidMount() {
    }

    getData() {
        ds.fsm.handleEvent(ReadDataEvents.StartGettingData, null);

        return waitFor(_ => this.fsm.state === STATES.OK)
            .then(_ => dataResult);
    }

    addToVocabulary(wordInput) {
        // Mocked:
        this.state.vocabulary[wordInput.type].push(wordInput.word);
    }

    createScheme(newScheme) {
        // Mocked:
        this.state.schemas.push(newScheme);
    }

    updateScheme(id, schemeToUpdate) {
        // Mocked:
        var index = this.state.schemas.findIndex(s => { return s.id === id; });
        this.state.schemas.splice(index, 1, schemeToUpdate);
    }
}