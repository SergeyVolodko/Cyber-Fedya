var STATES = Object.freeze({
    "OK": "OK",
    "Authorizing": "Authorizing",
    "DataFetching": "DataFetching",
    "TokenRevokation": "TokenRevokation",
    "SettingOfflineData": "SettingOfflineData",
    "GettingOfflineData": "GettingOfflineData",
    "Error": "Error"
});

function clearStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
}

class DataService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //vocabulary: [],
            schemas: [],
            apiRepository: props.apiRepository,
            last_write: localStorage.getItem('last_write')
        };
        this.getData = this.getData.bind(this);

        ds = this;
        this.fsm = new StateMachine({
            init: STATES.OK,
            transitions: [
                { name: 'StartGettingData', from: STATES.OK, to: STATES.Authorizing },
                { name: 'AuthorizationSucceeded', from: STATES.Authorizing, to: STATES.DataFetching },
                { name: 'AuthorizationFailed', from: STATES.Authorizing, to: STATES.TokenRevokation },
                { name: 'RevokationSucceeded', from: STATES.TokenRevoikation, to: STATES.DataFetching },
                { name: 'RevokationFailed', from: STATES.TokenRevokation, to: STATES.GettingOfflineData },
                { name: 'DataFetchSucceeded', from: STATES.DataFetching, to: STATES.SettingOfflineData },
                { name: 'DataFetchFailed', from: STATES.DataFetching, to: STATES.GettingOfflineData },
                { name: 'SetOfflineDataSucceeded', from: STATES.SettingOfflineData, to: STATES.GettingOfflineData },
                { name: 'GetOfflineDataSucceeded', from: STATES.GettingOfflineData, to: STATES.OK },
                { name: 'GetOfflineDataFailed', from: STATES.GettingOfflineData, to: STATES.Error },
            ],
            methods: {
                onStartgettingdata: function () {
                    // Since Login will leave the application we need this workaround
                    authorizationService.authorize(
                            ds.handleSuccessfulAuthorization,
                            ds.handleFailedAuthorization);
                },

                onAuthorizationsucceeded: function() {
                    ds.state.apiRepository
                        .getRequest("everything", ds.handleFetchedData, ds.handleFetchFailure);
                },

                onDatafetchsucceeded: function(data) {
                    localStorage.setItem("data", JSON.stringify(data));
                }
            }
        });
    }

    handleSuccessfulAuthorization() {
        ds.fsm.authorizationsucceeded();
    }

    handleFailedAuthorization() {
        ds.fsm.authorizationfailed();
    }

    handleFetchedData(data) {
        ds.fsm.datafetchsucceeded(data);
    }

    handleFetchFailure() {
        ds.fsm.datafetchfailed();
    }

    // cache revocation ?
    // sync-button ?
    componentDidMount() {
    }

    getVocabulary() {
        this.getData();
        //if (this.state.vocabulary.length === 0) {
        //    var data = this.state.apiRepository.getRequest("vocabulary");
        //    this.state.vocabulary = data;
        //}
        //return this.state.vocabulary;
    }


    getData() {
        this.fsm.startgettingdata();
        //if (!localStorage.getItem('login_is_in_progress'))

        //{
        //}
        //while (this.fsm.state !== STATES.OK);
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

    getSchemas() {
        //if (this.state.schemas.length === 0) {
        //    var data = this.state.apiRepository.getRequest("schemas");
        //    // why this.setState({schemas: data}) does not work?
        //    this.state.schemas = data;
        //}
        return this.state.schemas;
    }
}