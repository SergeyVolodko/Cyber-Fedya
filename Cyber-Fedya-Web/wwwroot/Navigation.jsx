class Navigation extends React.Component {

    navigation_instance = null;

    constructor(props) {
        super(props);
        this.state = {
            vocabulary: dataService.getVocabulary(),
            schemas: dataService.getSchemas()
        };

        navigation_instance = this;
    }

    notifyRefresh() {
        navigation_instance.setState({
            //vocabulary: dataService.getVocabulary(),
            //schemas: dataService.getSchemas()
            // Can't it be implemented without setState here?
        });
    }

    render() {
        return (
            <div>
                <ul class="nav nav-pills">
                    <li class="active"><a data-toggle="pill" href="#generator"><h1>Поехали!</h1></a></li>
                    <li><a data-toggle="pill" href="#schemas"><h1>Схемы</h1></a></li>
                    <li><a data-toggle="pill" href="#vocabulary"><h1>Словарь</h1></a></li>
                    <li><a data-toggle="pill" href="#history"><h1>Архив</h1></a></li>
                </ul>

                <div class="tab-content">
                    <div id="generator" class="tab-pane fade in active">
                        <JokeGenerator vocabulary={navigation_instance.state.vocabulary} schemas={navigation_instance.state.schemas}/>
                    </div>
                    <div id="schemas" class="tab-pane fade" >
                        <Schemas notifyRefresh={navigation_instance.notifyRefresh} schemas={navigation_instance.state.schemas}/>
                    </div>
                    <div id="vocabulary" class="tab-pane fade">
                        <Vocabulary vocabulary={navigation_instance.state.vocabulary} notifyRefresh={navigation_instance.notifyRefresh}/>
                    </div>
                    <div id="history" class="tab-pane fade">
                        <FavoriteJokes />
                    </div>
                </div>
            </div>
        );
    }
}