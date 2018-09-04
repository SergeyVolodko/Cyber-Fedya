var styles = {
    map: {
        height: '1000px',
        width: '1000px'
    }
};

var wordTypes = [
    "<Существительное>",
    "<Персонаж>",
    "<Прилагательное>",
    "<Глагол>",
    "<Место>"
];

var apiService = new ApiService({ baseUrl: "http://localhost:40384/api/" });

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            selectedProvince: ""
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