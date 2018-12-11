var StatesWrite = Object.freeze({
    "OK": "OK",
    "Authorizing": "Authorizing",
    "DataSending": "DataSending",

    //"TokenRevokation": "TokenRevokation",
    //"SettingOfflineData": "SettingOfflineData",
    //"GettingOfflineData": "GettingOfflineData",
    //"Error": "Error"
});

var WriteDataEvents = Object.freeze({
    "StartSendingData": "StartSendingData",
    "AuthorizationSucceeded": "AuthorizationSucceeded",
    "DataSendSucceeded": "DataSendSucceeded",

    "DataSendFailed": "DataSendFailed",

    //"SetOfflineDataSucceeded": "SetOfflineDataSucceeded",
    //"GetOfflineDataSucceeded": "GetOfflineDataSucceeded",
    //"AuthorizationFailed": "AuthorizationFailed",
    
    //"GetOfflineDataFailed": "GetOfflineDataFailed"
});

function clearStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('data');
}

class DataWriteService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRepository: props.apiRepository
        };

        this.addToVocabulary = this.addToVocabulary.bind(this);
        this.addNewJoke = this.addNewJoke.bind(this);

        dsw = this;

        this.fsm = new StateMachine([
            { event: WriteDataEvents.StartSendingData,        from: StatesWrite.OK,                 to: StatesWrite.Authorizing,        successAction: dsw.startAuthorization },
            { event: WriteDataEvents.AuthorizationSucceeded,  from: StatesWrite.Authorizing,        to: StatesWrite.DataSending,        successAction: dsw.startDataSending },
            { event: WriteDataEvents.DataSendSucceeded,       from: StatesWrite.DataSending,        to: StatesWrite.OK,                 successAction: dsw.completeSending },

            //{ event: ReadDataEvents.SetOfflineDataSucceeded, from: StatesRead.SettingOfflineData, to: StatesRead.GettingOfflineData, successAction: ds.getOfflineData },
            //{ event: ReadDataEvents.GetOfflineDataSucceeded, from: StatesRead.GettingOfflineData, to: StatesRead.OK,                 successAction: ds.returnData },

            //{ event: ReadDataEvents.AuthorizationFailed,     from: StatesRead.Authorizing,        to: StatesRead.GettingOfflineData, successAction: ds.getOfflineData },

            //{ event: ReadDataEvents.DataFetchFailed,         from: StatesRead.DataFetching,       to: StatesRead.GettingOfflineData, successAction: ds.getOfflineData },
            //{ event: ReadDataEvents.GetOfflineDataFailed,    from: StatesRead.GettingOfflineData, to: StatesRead.Error,              successAction: ds.finishFlowWithError }
            ],
            /*initial state:*/StatesWrite.OK);
    }

    // OK -> Authorizing
    startAuthorization() {
        authorizationService.authorize(
            dsw.handleSuccessfulAuthorization,
            dsw.handleFailedAuthorization);
    }
    handleSuccessfulAuthorization() {
        dsw.fsm.handleEvent(WriteDataEvents.AuthorizationSucceeded, null);
    }

    handleFailedAuthorization() {
        dsw.fsm.handleEvent(WriteDataEvents.AuthorizationFailed, null);
    }

    // Authorizing -> DataSending
    startDataSending() {
        if (dataToSend.type === 'create') {
            dsw.state.apiRepository
                .postRequest(dataToSend.entity, dataToSend.body, dsw.handleSentData, dsw.handleSendFailure);
        }
        else if (dataToSend.type === 'update') {
            dsw.state.apiRepository
                .putRequest(dataToSend.entity, dataToSend.body, dsw.handleSentData, dsw.handleSendFailure);
        }
    }
    handleSentData(data) {
        dsw.fsm.handleEvent(WriteDataEvents.DataSendSucceeded, data);
    }
    handleSendFailure() {
        dsw.fsm.handleEvent(WriteDataEvents.DataSendFailed, null);
    }

    //// DataFetching -> SettingOfflineData
    //setOfflineData(data) {
    //    localStorage.setItem("data", JSON.stringify(data));
    //    ds.fsm.handleEvent(ReadDataEvents.SetOfflineDataSucceeded, null);
    //}

    //// SettingOfflineData -> GettingOfflineData
    //getOfflineData() {
    //    try {
    //        var data = JSON.parse(localStorage.getItem("data"));
    //        if (!data) throw "No local data!";
    //        ds.fsm.handleEvent(ReadDataEvents.GetOfflineDataSucceeded, data);
    //    }
    //    catch (e) {
    //        ds.fsm.handleEvent(ReadDataEvents.GetOfflineDataFailed, null);
    //    }
    //}

    completeSending() {
    }

    //finishFlowWithError() {
    //    location.pathname = "/error.html";
    //}


    // cache revocation ?
    // sync-button ?
    componentDidMount() {
    }

    dataToSend = null;

    createScheme(newScheme) {
        dataToSend = { type: 'create', entity: 'schemes', body: newScheme }

        dsw.fsm.handleEvent(WriteDataEvents.StartSendingData, null);

        return waitFor(_ => this.fsm.state === StatesWrite.OK)
            .then(_ => 201);
    }

    addToVocabulary(wordInput) {
        dataToSend = { type: 'create', entity: 'vocabulary', body: wordInput }

        dsw.fsm.handleEvent(WriteDataEvents.StartSendingData, null);

        return waitFor(_ => this.fsm.state === StatesWrite.OK)
            .then(_ => 201);
    }

    addNewJoke(joke) {
        dataToSend = { type: 'create', entity: 'jokes', body: joke }

        dsw.fsm.handleEvent(WriteDataEvents.StartSendingData, null);

        return waitFor(_ => this.fsm.state === StatesWrite.OK)
            .then(_ => 201);
    }

    updateScheme(id, schemeToUpdate) {
        // Mocked:
        var index = this.state.schemas.findIndex(s => { return s.id === id; });
        this.state.schemas.splice(index, 1, schemeToUpdate);
    }
}