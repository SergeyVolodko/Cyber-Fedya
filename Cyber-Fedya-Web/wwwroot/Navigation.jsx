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
                    <li class="active"><a data-toggle="pill" href="#generator">Поехали!</a></li>
                    <li><a data-toggle="pill" href="#schemas">Схемы</a></li>
                    <li><a data-toggle="pill" href="#dictinary">Словарь</a></li>
                    <li><a data-toggle="pill" href="#history">Архив</a></li>
                </ul>

                <div class="tab-content">
                    <div id="generator" class="tab-pane fade in active">
                        <JokeGenerator />
                    </div>
                    <div id="schemas" class="tab-pane fade">
                        <h3>Схемы шуток</h3>
                    </div>
                    <div id="dictinary" class="tab-pane fade">
                        <h3>Федин словарный запас</h3>
                    </div>
                    <div id="history" class="tab-pane fade">
                        <h3>Сохранённые шедевры</h3>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
       
    }
}