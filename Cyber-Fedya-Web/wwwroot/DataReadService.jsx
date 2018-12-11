var StatesRead = Object.freeze({
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
    "GetOfflineDataFailed": "GetOfflineDataFailed"
});

class DataReadService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRepository: props.apiRepository
        };
        this.getData = this.getData.bind(this);

        ds = this;

        this.fsm = new StateMachine([
            { event: ReadDataEvents.StartGettingData,        from: StatesRead.OK,                 to: StatesRead.Authorizing,        successAction: ds.startAuthorization },
            { event: ReadDataEvents.AuthorizationSucceeded,  from: StatesRead.Authorizing,        to: StatesRead.DataFetching,       successAction: ds.startDataFetching },
            { event: ReadDataEvents.DataFetchSucceeded,      from: StatesRead.DataFetching,       to: StatesRead.SettingOfflineData, successAction: ds.setOfflineData },
            { event: ReadDataEvents.SetOfflineDataSucceeded, from: StatesRead.SettingOfflineData, to: StatesRead.GettingOfflineData, successAction: ds.getOfflineData },
            { event: ReadDataEvents.GetOfflineDataSucceeded, from: StatesRead.GettingOfflineData, to: StatesRead.OK,                 successAction: ds.returnData },

            { event: ReadDataEvents.AuthorizationFailed,     from: StatesRead.Authorizing,        to: StatesRead.GettingOfflineData, successAction: ds.getOfflineData },

            { event: ReadDataEvents.DataFetchFailed,         from: StatesRead.DataFetching,       to: StatesRead.GettingOfflineData, successAction: ds.getOfflineData },
            { event: ReadDataEvents.GetOfflineDataFailed,    from: StatesRead.GettingOfflineData, to: StatesRead.Error,              successAction: ds.finishFlowWithError }
            ],
            /*initial state:*/StatesRead.OK);
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

    // Public methods:
    getData() {
        ds.fsm.handleEvent(ReadDataEvents.StartGettingData, null);

        return waitFor(_ => this.fsm.state === StatesRead.OK)
            .then(_ => dataResult);
    }
}