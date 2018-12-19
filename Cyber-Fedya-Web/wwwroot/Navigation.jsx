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
                        isOffline: data.hasConnectionErrors
                    });
                    navigation_instance.setState({
                        // Can't it be implemented without setState here?
                    });
                }
        );
    }

    componentDidMount() {
        navigation_instance.operationStart();
        dataReadService.getData()
            .then(data => {
                    navigation_instance.setState({
                        vocabulary: data.vocabulary,
                        jokes: data.jokes,
                        schemas: data.schemas,
                        isLoading: false,
                        isOffline: data.hasConnectionErrors
                    });
                }
        );
    }

    render() {
        var offlineAlert = (
            <div className="alert alert-danger">
                <p className="text-center">Работает без интернета. Сохранения пока невозможны</p>
            </div>);

        return (
            <div>
                <ul className="nav nav-pills">
                    <li className="active main-menu-tab-button"><a className="main-menu-tab-button-text" data-toggle="pill" href="#generator">Поехали!</a></li>
                    <li className="main-menu-tab-button"><a className="main-menu-tab-button-text" data-toggle="pill" href="#schemas">Схемы</a></li>
                    <li className="main-menu-tab-button"><a className="main-menu-tab-button-text" data-toggle="pill" href="#vocabulary">Словарь</a></li>
                    <li className="main-menu-tab-button"><a className="main-menu-tab-button-text" data-toggle="pill" href="#jokes">Архив</a></li>
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