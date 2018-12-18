class Vocabulary extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            vocabulary: props.vocabulary,
            notifyRefresh: props.notifyRefresh,
            enteredWord: ""
        };
    }

    addEnteredWordTo(wordType) {
        var word = this.state.enteredWord;
        dataWriteService.addToVocabulary({ type: wordType, word: word })
            .then(isSuccessful => {
                if (!isSuccessful) {
                    toastr.error("Не удалось сохранить слово", "Ошибка");
                    return;
                }
                toastr.success("Слово успешно добавлено", "Сохранено");
            });
        this.state.notifyRefresh();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vocabulary === this.state.vocabulary) {
            return;
        }
        this.setState({
            vocabulary: nextProps.vocabulary
        });
        new Awesomplete(document.getElementById("characters-text-search"), { list: nextProps.vocabulary.characters });
        new Awesomplete(document.getElementById("nouns-text-search"), { list: nextProps.vocabulary.nouns });
        new Awesomplete(document.getElementById("adjectives-text-search"), { list: nextProps.vocabulary.adjectives });
        new Awesomplete(document.getElementById("verbs-text-search"), { list: nextProps.vocabulary.verbs });
        new Awesomplete(document.getElementById("places-text-search"), { list: nextProps.vocabulary.places });
    }

    canWordBeAddedTo(vocabularyType) {
        var words = this.state.vocabulary[vocabularyType];
        var word = this.state.enteredWord;

        if (!word || word.length < 2) {
            return false;
        }
        return words.indexOf(word) === -1;
    }

    handleWordChange(e) {
        this.setState({ enteredWord: e.target.value });
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
                        <div className="vocabulary-page">
                            <input id="characters-text-search" className="input-word-text-search"
                                value={this.state.enteredWord}
                                onChange={this.handleWordChange.bind(this)} />

                            <button type="button" className="btn btn-success btn-add-word"
                                onClick={() => this.addEnteredWordTo("characters")}
                                disabled={!this.canWordBeAddedTo("characters")}>
                                <i className="fa fa-plus"></i>
                            </button>

                            <ul className="vocabulary-words-list">{characters}</ul>
                        </div>
                    </div>
                    <div id="nouns" className="tab-pane fade">
                        <div className="vocabulary-page">
                            <input id="nouns-text-search" className="input-word-text-search"
                               value={this.state.enteredWord}
                                onChange={this.handleWordChange.bind(this)} />

                            <button type="button" className="btn btn-success btn-add-word"
                                    onClick={() => this.addEnteredWordTo("nouns")}
                                    disabled={!this.canWordBeAddedTo("nouns")}>
                                <i className="fa fa-plus"></i></button>

                            <ul className="vocabulary-words-list">{nouns}</ul>
                        </div>
                    </div>
                    <div id="adjectives" className="tab-pane fade">
                        <div className="vocabulary-page">
                            <input id="adjectives-text-search" className="input-word-text-search"
                               value={this.state.enteredWord}
                                onChange={this.handleWordChange.bind(this)} />

                            <button type="button" className="btn btn-success btn-add-word"
                                onClick={() => this.addEnteredWordTo("adjectives")}
                                disabled={!this.canWordBeAddedTo("adjectives")}>
                                <i className="fa fa-plus"></i></button>

                            <ul className="vocabulary-words-list">{adjectives}</ul>
                        </div>
                    </div>
                    <div id="verbs" className="tab-pane fade">
                        <div className="vocabulary-page">
                            <input id="verbs-text-search" className="input-word-text-search"
                               value={this.state.enteredWord}
                                onChange={this.handleWordChange.bind(this)} />

                            <button type="button" className="btn btn-success btn-add-word"
                                onClick={() => this.addEnteredWordTo("verbs")}
                                disabled={!this.canWordBeAddedTo("verbs")}>
                                <i className="fa fa-plus"></i></button>

                            <ul className="vocabulary-words-list">{verbs}</ul>
                        </div>
                    </div>
                    <div id="places" className="tab-pane fade">
                        <div className="vocabulary-page">
                            <input id="places-text-search" className="input-word-text-search"
                               value={this.state.enteredWord}
                                onChange={this.handleWordChange.bind(this)} />

                            <button type="button" className="btn btn-success btn-add-word"
                                onClick={() => this.addEnteredWordTo("places")}
                                disabled={!this.canWordBeAddedTo("places")}>
                                <i className="fa fa-plus"></i></button>

                            <ul className="vocabulary-words-list">{places}</ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}