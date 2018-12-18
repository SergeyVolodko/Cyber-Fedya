class Vocabulary extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            vocabulary: props.vocabulary,
            notifyRefresh: props.notifyRefresh
        };
    }

    addNoun(word) {
        dataWriteService.addToVocabulary({ type: "nouns", word: word });
        this.state.notifyRefresh();
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vocabulary === this.state.vocabulary) {
            return;
        }
        this.setState({
            vocabulary: nextProps.vocabulary
        });
        new Awesomplete(document.getElementById("characters-text-search"), { list: nextProps.vocabulary.characters });
    }

    render() {
        var characters = this.state.vocabulary.characters.map((word, i) =>
            <li key={i}>{word}</li>
        );
        var nouns = this.state.vocabulary.nouns.map((word, i) =>
            <li key={i}>{word}</li>
        );
        var adjectives = this.state.vocabulary.adjectives.map((word, i) =>
            <li key={i}>{word}</li>
        );
        var verbs = this.state.vocabulary.verbs.map((word, i) =>
            <li key={i}>{word}</li>
        );
        var places = this.state.vocabulary.places.map((word, i) =>
            <li key={i}>{word}</li>
        );

        return (
            <div>
                <p className="tab-title">Федин словарный запас</p>

                <ul className="nav nav-pills nav-justified">
                    <li className="active word-menu-tab-button"><a data-toggle="pill" href="#characters" className="word-menu-tab-button-text">Герои</a></li>
                    <li className="word-menu-tab-button"><a data-toggle="pill" href="#nouns" className="word-menu-tab-button-text">Существительные</a></li>
                    <li className="word-menu-tab-button"><a data-toggle="pill" href="#adjectives" className="word-menu-tab-button-text">Прилагательные</a></li>
                    <li className="word-menu-tab-button"><a data-toggle="pill" href="#verbs" className="word-menu-tab-button-text">Глаголы</a></li>
                    <li className="word-menu-tab-button"><a data-toggle="pill" href="#places" className="word-menu-tab-button-text">Места</a></li>
                </ul>

                <div className="tab-content">
                    <div id="characters" className="tab-pane fade in active">
                        <input id="characters-text-search"/>
                        <ul id="vocabulary-characters-list">{characters}</ul>
                    </div>
                    <div id="nouns" className="tab-pane fade">
                        <button type="button" className="btn btn-success btn-lg" onClick={() => this.addNoun("test")}><i className="fa fa-plus"></i></button>
                        <ul>{nouns}</ul>
                    </div>
                    <div id="adjectives" className="tab-pane fade">
                        <button type="button" className="btn btn-success btn-lg"><i className="fa fa-plus"></i></button>
                        <ul>{adjectives}</ul>
                    </div>
                    <div id="verbs" className="tab-pane fade">
                        <button type="button" className="btn btn-success btn-lg"><i className="fa fa-plus"></i></button>
                        <ul>{verbs}</ul>
                    </div>
                    <div id="places" className="tab-pane fade">
                        <button type="button" className="btn btn-success btn-lg"><i className="fa fa-plus"></i></button>
                        <ul>{places}</ul>
                    </div>
                </div>
            </div>
        );
    }

    //<input list="browsers" />
    //    <datalist id="browsers">
    //        <option value="Internet Explorer" />
    //        <option value="Firefox" />
    //        <option value="Chrome" />
    //        <option value="Opera" />
    //        <option value="Safari" />
    //    </datalist>
}