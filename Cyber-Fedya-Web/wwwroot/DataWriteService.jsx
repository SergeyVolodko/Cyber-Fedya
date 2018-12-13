var StatesWrite = Object.freeze({
    "OK": "OK",
    "Authorizing": "Authorizing",
    "DataSending": "DataSending",
    "SettingOfflineMode": "SettingOfflineMode",
    "Failure": "Failure"
});

var WriteDataEvents = Object.freeze({
    "StartSendingData": "StartSendingData",
    "AuthorizationSucceeded": "AuthorizationSucceeded",
    "DataSendSucceeded": "DataSendSucceeded",
    "DataSendFailed": "DataSendFailed"
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
        this.createScheme = this.createScheme.bind(this);
        this.updateScheme = this.updateScheme.bind(this);

        dsw = this;

        this.fsm = new StateMachine([
            { event: WriteDataEvents.StartSendingData,        from: StatesWrite.OK,                 to: StatesWrite.Authorizing,        successAction: dsw.startAuthorization },
            { event: WriteDataEvents.AuthorizationSucceeded,  from: StatesWrite.Authorizing,        to: StatesWrite.DataSending,        successAction: dsw.startDataSending },
            { event: WriteDataEvents.DataSendSucceeded,       from: StatesWrite.DataSending,        to: StatesWrite.OK,                 successAction: dsw.completeSending },

            { event: WriteDataEvents.AuthorizationFailed,     from: StatesWrite.Authorizing,        to: StatesWrite.Failure,            successAction: dsw.finishFlowWithError },
            { event: WriteDataEvents.DataSendFailed,          from: StatesWrite.DataSending,        to: StatesWrite.Failure,            successAction: dsw.finishFlowWithError },

            { event: WriteDataEvents.StartSendingData,        from: StatesWrite.Failure,            to: StatesWrite.Authorizing,        successAction: dsw.startAuthorization },
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
                .putRequest(dataToSend.entity, dataToSend.id, dataToSend.body, dsw.handleSentData, dsw.handleSendFailure);
        }
    }
    handleSentData(data) {
        dsw.fsm.handleEvent(WriteDataEvents.DataSendSucceeded, data);
    }
    handleSendFailure() {
        dsw.fsm.handleEvent(WriteDataEvents.DataSendFailed, null);
    }

    finishFlowWithError() {
    }

    completeSending() {
    }

    // cache revocation ?
    // sync-button ?
    componentDidMount() {
    }

    dataToSend = null;

    createScheme(newScheme) {
        dataToSend = { type: 'create', entity: 'schemes', body: newScheme }

        dsw.fsm.handleEvent(WriteDataEvents.StartSendingData, null);

        return waitFor(_ => this.fsm.state === StatesWrite.OK || this.fsm.state === StatesWrite.Failure)
            .then(_ => this.fsm.state === StatesWrite.OK);
    }

    updateScheme(id, schemeToUpdate) {
        dataToSend = { type: 'update', entity: 'schemes', body: schemeToUpdate, id: id }

        dsw.fsm.handleEvent(WriteDataEvents.StartSendingData, null);

        return waitFor(_ => this.fsm.state === StatesWrite.OK || this.fsm.state === StatesWrite.Failure)
            .then(_ => this.fsm.state === StatesWrite.OK);
    }

    addToVocabulary(wordInput) {
        dataToSend = { type: 'create', entity: 'vocabulary', body: wordInput }

        dsw.fsm.handleEvent(WriteDataEvents.StartSendingData, null);

        return waitFor(_ => this.fsm.state === StatesWrite.OK || this.fsm.state === StatesWrite.Failure)
            .then(_ => this.fsm.state === StatesWrite.OK);
    }

    addNewJoke(joke) {
        dataToSend = { type: 'create', entity: 'jokes', body: joke }

        dsw.fsm.handleEvent(WriteDataEvents.StartSendingData, null);

        return waitFor(_ => this.fsm.state === StatesWrite.OK || this.fsm.state === StatesWrite.Failure)
            .then(_ => this.fsm.state === StatesWrite.OK);
    }
}