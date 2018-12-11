const emptyVocabulary = { nouns: [], adjectives: [], verbs: [], characters: [], places: [] };

class Navigation extends React.Component {

    navigation_instance = null;

    constructor() {
        super();
        this.state = {
            vocabulary: emptyVocabulary,
            schemas: [],
            jokes: []
        };
        navigation_instance = this;
    }

    notifyRefresh() {
        dataReadService.getData()
            .then(data => {
                    navigation_instance.setState({
                        vocabulary: data.vocabulary,
                        jokes: data.jokes,
                        schemas: data.schemas
                    });
                }
        );

        navigation_instance.setState({
            // Can't it be implemented without setState here?
        });
    }

    componentDidMount() {
        dataReadService.getData()
            .then(data => {
                    navigation_instance.setState({
                        vocabulary: data.vocabulary,
                        jokes: data.jokes,
                        schemas: data.schemas
                    });
                }
        );
    }

    render() {
        return (
            <div>
                <ul className="nav nav-pills">
                    <li className="active"><a data-toggle="pill" href="#generator"><h1>Поехали!</h1></a></li>
                    <li><a data-toggle="pill" href="#schemas"><h1>Схемы</h1></a></li>
                    <li><a data-toggle="pill" href="#vocabulary"><h1>Словарь</h1></a></li>
                    <li><a data-toggle="pill" href="#jokes"><h1>Архив</h1></a></li>
                </ul>

                <div className="tab-content">
                    <div id="generator" className="tab-pane fade in active">
                        <JokeGenerator vocabulary={navigation_instance.state.vocabulary} schemas={navigation_instance.state.schemas} notifyRefresh={navigation_instance.notifyRefresh}/>
                    </div>

                    <div id="schemas" className="tab-pane fade" >
                        <Schemas notifyRefresh={navigation_instance.notifyRefresh} schemas={navigation_instance.state.schemas} />
                    </div>

                    <div id="vocabulary" className="tab-pane fade">
                        <Vocabulary vocabulary={navigation_instance.state.vocabulary} notifyRefresh={navigation_instance.notifyRefresh} />
                    </div>

                    <div id="jokes" className="tab-pane fade">
                        <FavoriteJokes jokes={navigation_instance.state.jokes} />
                    </div>
                </div>
            </div>
        );
    }
}