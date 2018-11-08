class JokeGenerator extends React.Component{
    joke_generator_instance = null;

    constructor(props) {
        super();
        this.state = {
            vocabulary: props.vocabulary,
            schemas: props.schemas,
            selected_scheme_index: 0,
            previousJoke: "",
            joke : ""
        };

        joke_generator_instance = this;
    }

    schemeSelected(e) {
        var selectedSchemeName = e.params.data.text;
        var index = joke_generator_instance.state.schemas
            .findIndex(s => { return s.name === selectedSchemeName; });

        joke_generator_instance.setState({
            selected_scheme_index: index
        });
    }

    componentWillReceiveProps(nextProps) {
        // Handle deletion of selected scheme
        //joke_generator_instance.setState({});
    }

    generateJoke() {
        var scheme = joke_generator_instance.state.schemas[joke_generator_instance.state.selected_scheme_index];
        var words = scheme.words;
        var sentence = "";
        words.forEach(function (word) {
            sentence += mapWord(word.text, joke_generator_instance.state.vocabulary) + " ";
        });
        joke_generator_instance.setState({
            previousJoke: joke_generator_instance.state.joke,
            joke: sentence
        });
    }

    returnPreviousJoke() {
        joke_generator_instance.setState({
            previousJoke: "",
            joke: joke_generator_instance.state.previousJoke
        });
    }

    render() {
        return (
            <div>
                <h3>Лэтc гоу - поехали!</h3>
                <div class="scheme-selector">
                    <select id="joke-generator-schemas-select">
                        {this.state.schemas.map((item) => <option key={item.id}>{item.name}</option>, this)}
                    </select>
                </div>

                <textarea class="form-control generated-joke-text" id="joke" rows="10" value={this.state.joke}></textarea>
                <div class="row">
                    <div class="col-xs-2">
                        <button type="button"
                            class="btn btn-secondary btn-lg generator-button"
                            disabled={!joke_generator_instance.state.previousJoke}
                            onClick={() => this.returnPreviousJoke()}><i class="fa fa-backward" /></button>
                    </div>
                    <div class="col-xs-8">
                        <button type="button"
                            class="btn btn-primary btn-lg generator-button"
                            onClick={() => this.generateJoke()}>
                            <h2>Ещё!</h2>
                        </button>
                    </div>
                    <div class="col-xs-2">
                        <button type="button" class="btn btn-success btn-lg generator-button"><i class="fa fa-save"></i></button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        joke_generator_instance.initSelect();
    }

    componentDidUpdate(prevProps, prevState) {
        joke_generator_instance.initSelect();
    }

    initSelect() {
        var schemsSelect = $('#joke-generator-schemas-select');
        schemsSelect.select2({
            width: '100%',
            tags: false
        });
        schemsSelect.on('select2:select', function (value) { joke_generator_instance.schemeSelected(value) });
        schemsSelect.trigger("change");
    }
}