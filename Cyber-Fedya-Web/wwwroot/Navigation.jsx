class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    changeProvince(e) {
        this.setState({

            });
    }

    render() {
        return (
            <div>
                <ul class="nav nav-pills">
                    <li class="active"><a data-toggle="pill" href="#generator"><h1>Поехали!</h1></a></li>
                    <li><a data-toggle="pill" href="#schemas"><h1>Схемы</h1></a></li>
                    <li><a data-toggle="pill" href="#dictinary"><h1>Словарь</h1></a></li>
                    <li><a data-toggle="pill" href="#history"><h1>Архив</h1></a></li>
                </ul>

                <div class="tab-content">
                    <div id="generator" class="tab-pane fade in active">
                        <JokeGenerator />
                    </div>
                    <div id="schemas" class="tab-pane fade">
                        <Schemas />
                    </div>
                    <div id="dictinary" class="tab-pane fade">
                        <Dictinaries />
                    </div>
                    <div id="history" class="tab-pane fade">
                        <FavoriteJokes />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
       
    }
}