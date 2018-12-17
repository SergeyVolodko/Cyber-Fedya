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
                <h3 className="tab-title">Федин словарный запас</h3>

                <ul className="nav nav-pills nav-justified">
                    <li className="active"><a data-toggle="pill" href="#characters"><h1>Герои</h1></a></li>
                    <li><a data-toggle="pill" href="#nouns"><h1>Существительные</h1></a></li>
                    <li><a data-toggle="pill" href="#adjectives"><h1>Прилагательные</h1></a></li>
                    <li><a data-toggle="pill" href="#verbs"><h1>Глаголы</h1></a></li>
                    <li><a data-toggle="pill" href="#places"><h1>Места</h1></a></li>
                </ul>

                <div className="tab-content">
                    <div id="characters" className="tab-pane fade in active">
                        <ul>{characters}</ul>
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
}