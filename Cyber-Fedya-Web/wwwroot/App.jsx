var globalWordTypes = [
    "<Существительное>",
    "<Персонаж>",
    "<Прилагательное>",
    "<Глагол>",
    "<Место>"
];

// Registrations
var authorizationService = new AuthorizationService();
var apiRepo = new ApiRepository({ baseUrl: "http://localhost:40385/api/" });
var dataReadService = new DataReadService({ apiRepository: apiRepo });
var dataWriteService = new DataWriteService({ apiRepository: apiRepo });
// Registrations

class App extends React.Component{
    constructor() {
        super();
        authorizationClient.handleAuthentication();

        this.mainComponent = "";

        waitForAuthorization(!localStorage.getItem("is_authentication_handled"), this.setMainComponent);
        localStorage.removeItem("is_authentication_handled");
        app_instance = this;

        app_instance.state = {
            mainComponent: (
                <div>
                    <h1>Authorizing...</h1>
                    <div className="loading-circle fa-spin"></div>
                </div>)
        };
    }

    setMainComponent() {
        var mainComponent = app_instance.state.mainComponent;

        switch (location.pathname) {
        case "":
        case "/":
            mainComponent = <Navigation />;
            break;
        default:
            mainComponent = <NotFound />;
        }

        app_instance.setState({ mainComponent });
    }

    render() {
        return (
            <div>
                {app_instance.state.mainComponent}
            </div>);

        //<div>
        // Loading...
        // <div className="loading-circle fa-spin"></div>
        //</div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);