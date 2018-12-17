const globalWordTypes = [
    "<Существительное>",
    "<Персонаж>",
    "<Прилагательное>",
    "<Глагол>",
    "<Место>"
];

// Registrations
var apiRepo = new ApiRepository({ baseUrl: Config.BaseUrl });
var authorizationClient = new Auth0Client();
var authorizationService = new AuthorizationService({ apiRepository: apiRepo, authorizationClient: authorizationClient });
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
            mainComponent: <Spinner text="Авторизация..." />
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
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);