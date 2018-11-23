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
        switch (location.pathname) {
        case "":
        case "/":
            this.mainComponent = <Navigation/>;
                break;
        //case "/auth_callback":
        //    this.mainComponent = <AuthCallback/>;
        //    break;
        default:
            this.mainComponent = <NotFound />;
        }
    }
    //componentDidMount() {
        
    //}
    render() {
        return (
            <div>
                {this.mainComponent}
            </div>

        //<div>
        // Loading...
        // <div className="loading-circle fa-spin"></div>
        //</div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);