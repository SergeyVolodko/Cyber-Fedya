var wordTypes = [
    "<Существительное>",
    "<Персонаж>",
    "<Прилагательное>",
    "<Глагол>",
    "<Место>"
];

var apiService = new ApiService({ baseUrl: "http://localhost:40384/api/" });

function generateKey(pre) {
    return ""+ pre + new Date().getTime();
}

// Required to make possible entering custom text to select
function select2CreateTag(params) {
    return {
      id: params.term,
      text: params.term,
      newOption: true
    }
  }

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