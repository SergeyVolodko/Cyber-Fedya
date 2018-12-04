class Vocabulary extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            vocabulary: props.vocabulary,
            notifyRefresh: props.notifyRefresh
        };
    }

    addNoun(word) {
        //dataService.addToVocabulary({ type: "nouns", word: word });
        this.state.notifyRefresh();
        this.forceUpdate();
    }

    render() {
        var characters = this.state.vocabulary.characters.map((word, i) =>
            <li key={i}>{word}</li>
        );
        var nouns = this.state.vocabulary.nouns.map((word, i) =>
            <li key={i}>{word}</li>
        );

        return (
            <div>
                <h3>Федин словарный запас</h3>

                <ul class="nav nav-pills nav-justified">
                    <li class="active"><a data-toggle="pill" href="#characters"><h1>Герои</h1></a></li>
                    <li><a data-toggle="pill" href="#nouns"><h1>Существительные</h1></a></li>
                    <li><a data-toggle="pill" href="#adjectives"><h1>Прилагательные</h1></a></li>
                    <li><a data-toggle="pill" href="#verbs"><h1>Глаголы</h1></a></li>
                    <li><a data-toggle="pill" href="#places"><h1>Места</h1></a></li>
                </ul>

                <div class="tab-content">
                    <div id="characters" class="tab-pane fade in active">
                        <ul>{characters}</ul>
                    </div>
                    <div id="nouns" class="tab-pane fade">
                        <button type="button" class="btn btn-success btn-lg" onClick={() => this.addNoun("test")}><i class="fa fa-plus"></i></button>
                        <ul>{nouns}</ul>
                    </div>
                    <div id="adjectives" class="tab-pane fade">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                    <div id="verbs" class="tab-pane fade">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                    <div id="places" class="tab-pane fade">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}