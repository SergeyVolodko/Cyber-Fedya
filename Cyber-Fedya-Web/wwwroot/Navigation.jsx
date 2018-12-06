var emptyVocabulary = { nouns: [], adjectives: [], verbs: [], characters: [], places: [] };

class Navigation extends React.Component {

    navigation_instance = null;

    constructor() {
        super();
        this.state = {
            vocabulary: emptyVocabulary,
            schemas: []
        };
        navigation_instance = this;
    }

    notifyRefresh() {
        navigation_instance.setState({
            // Can't it be implemented without setState here?
        });
    }

    componentDidMount() {
        dataService.getData()
            .then(data => {
                    navigation_instance.setState({
                        vocabulary: data.vocabulary
                        //,schemas: data.Schemas
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
                    <li><a data-toggle="pill" href="#history"><h1>Архив</h1></a></li>
                </ul>

                <div className="tab-content">
                    <div id="generator" class="tab-pane fade in active">
                        <JokeGenerator vocabulary={navigation_instance.state.vocabulary} schemas={navigation_instance.state.schemas} />
                    </div>

                    <div id="vocabulary" className="tab-pane fade">
                        <Vocabulary vocabulary={navigation_instance.state.vocabulary} notifyRefresh={navigation_instance.notifyRefresh} />
                    </div>

                    <div id="history" className="tab-pane fade">
                        <FavoriteJokes />
                    </div>
                </div>
            </div>
        );

        //<div id="schemas" className="tab-pane fade" >
        //    <Schemas notifyRefresh={navigation_instance.notifyRefresh} schemas={navigation_instance.state.schemas} />
        //    </div>

    }
}