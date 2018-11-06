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
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Navigation />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);