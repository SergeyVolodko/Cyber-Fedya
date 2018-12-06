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

        myWait(!localStorage.getItem("is_authentication_handled"), this.setMainComponent);
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
    //componentDidMount() {
        
    //}

    setMainComponent() {
        var mainComponent = app_this.state.mainComponent;

        switch (location.pathname) {
        case "":
        case "/":
            mainComponent = <Navigation />;
            break;
        //case "/auth_callback":
        //    this.mainComponent = <AuthCallback/>;
        //    break;
        default:
            mainComponent = <NotFound />;
        }

        app_this.setState({ mainComponent });

        //app_this.forceUpdate();
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