var globalWordTypes = [
    "<Существительное>",
    "<Персонаж>",
    "<Прилагательное>",
    "<Глагол>",
    "<Место>"
];

var dataService = new DataService({ apiRepository: new ApiRepository({ baseUrl: "http://localhost:40384/api/" }) });

class App extends React.Component{
    constructor() {
        super();
        authorizationClient.handleAuthentication();

        this.mainComponent = "";

        myWait(!localStorage.getItem("is_authentication_handled"), this.setMainComponent);
        localStorage.removeItem("is_authentication_handled");
        app_this = this;
    }
    //componentDidMount() {
        
    //}

    setMainComponent() {
        app_this.mainComponent = "";
        switch (location.pathname) {
        case "":
        case "/":
            app_this.mainComponent = <Navigation />;
            break;
        //case "/auth_callback":
        //    this.mainComponent = <AuthCallback/>;
        //    break;
        default:
            app_this.mainComponent = <NotFound />;
        }

        app_this.forceUpdate();
    }

    render() {
        if (app_this.mainComponent === "") {
            return (
                <div>
                    <h1>Authorizing...</h1>
                    <div className="loading-circle fa-spin"></div>
                </div>);
        } else {
            return (
                <div>
                    {this.mainComponent}
                </div>);
        }

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