var globalWordTypes = [
    "<Существительное>",
    "<Персонаж>",
    "<Прилагательное>",
    "<Глагол>",
    "<Место>"
];

var dataService = new DataService({ apiRepository: new ApiRepository({ baseUrl: "http://localhost:40385/api/" }) });

class App extends React.Component{
    constructor() {
        super();
        authorizationClient.handleAuthentication();

        this.mainComponent = "";

        waitForAuthorization(!localStorage.getItem("is_authentication_handled"), this.setMainComponent);
        localStorage.removeItem("is_authentication_handled");
        app_this = this;

        app_this.state = {
            mainComponent: (
                <div>
                    <h1>Authorizing...</h1>
                    <div className="loading-circle fa-spin"></div>
                </div>)
        };
    }

    setMainComponent() {
        var mainComponent = app_this.state.mainComponent;

        switch (location.pathname) {
        case "":
        case "/":
            mainComponent = <Navigation />;
            break;
        default:
            mainComponent = <NotFound />;
        }

        app_this.setState({ mainComponent });
    }

    render() {
        return (
            <div>
                {app_this.state.mainComponent}
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