const emptyVocabulary = { nouns: [], adjectives: [], verbs: [], characters: [], places: [] };

class Navigation extends React.Component {

    navigation_instance = null;

    constructor() {
        super();
        this.state = {
            vocabulary: emptyVocabulary,
            schemas: [],
            jokes: [],
            isLoading: false,
            isOffline: false
        };
        navigation_instance = this;
    }

    operationStart() {
        navigation_instance.setState({
            isLoading: true
        });
    }

    operationFailed() {
        navigation_instance.setState({
            isLoading: false,
            isOffline: true
        });
    }

    notifyRefresh() {
        dataReadService.getData()
            .then(data => {
                    navigation_instance.setState({
                        vocabulary: data.vocabulary,
                        jokes: data.jokes,
                        schemas: data.schemas,
                        isLoading: false,
                        isOffline: false
                    });
                }
        );

        navigation_instance.setState({
            // Can't it be implemented without setState here?
        });
    }

    componentDidMount() {
        navigation_instance.operationStart();
        dataReadService.getData()
            .then(data => {
                    navigation_instance.setState({
                        vocabulary: data.vocabulary,
                        jokes: data.jokes,
                        schemas: data.schemas,
                        isLoading: false
                    });
                }
        );
    }

    render() {
        var offlineAlert = (
            <div className="alert alert-danger">
                <h1 className="text-center">Работает без интернета</h1>
            </div>);

        return (
            <div>
                <ul className="nav nav-pills">
                    <li className="active"><a data-toggle="pill" href="#generator"><h1>Поехали!</h1></a></li>
                    <li><a data-toggle="pill" href="#schemas"><h1>Схемы</h1></a></li>
                    <li><a data-toggle="pill" href="#vocabulary"><h1>Словарь</h1></a></li>
                    <li><a data-toggle="pill" href="#jokes"><h1>Архив</h1></a></li>
                </ul>
                {navigation_instance.state.isOffline && offlineAlert}

                <div className="tab-content">
                    {navigation_instance.state.isLoading && <Spinner text="Загрузка..." />}
                    <div id="generator" className="tab-pane fade in active">
                        <JokeGenerator
                            vocabulary={navigation_instance.state.vocabulary}
                            schemas={navigation_instance.state.schemas}
                            notifyRefresh={navigation_instance.notifyRefresh}
                            notifyOperationStart={navigation_instance.operationStart}
                            notifyOperationFailed={navigation_instance.operationFailed} />
                    </div>

                    <div id="schemas" className="tab-pane fade" >
                        <Schemas
                            schemas={navigation_instance.state.schemas}
                            notifyRefresh={navigation_instance.notifyRefresh}
                            notifyOperationStart={navigation_instance.operationStart}
                            notifyOperationFailed={navigation_instance.operationFailed}/>
                    </div>

                    <div id="vocabulary" className="tab-pane fade">
                        <Vocabulary
                            vocabulary={navigation_instance.state.vocabulary}
                            notifyRefresh={navigation_instance.notifyRefresh} />
                    </div>

                    <div id="jokes" className="tab-pane fade">
                        <FavoriteJokes jokes={navigation_instance.state.jokes} />
                    </div>
                </div>
            </div>
        );
    }
}