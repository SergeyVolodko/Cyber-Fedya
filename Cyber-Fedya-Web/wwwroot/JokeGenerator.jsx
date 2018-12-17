class JokeGenerator extends React.Component{
    joke_generator_instance = null;

    constructor(props) {
        super();
        this.state = {
            vocabulary: props.vocabulary,
            schemas: props.schemas,
            selected_scheme_index: 0,
            previousJoke: "",
            joke: "",
            notifyRefresh: props.notifyRefresh,
            notifyOperationStart: props.notifyOperationStart,
            notifyOperationFailed: props.notifyOperationFailed
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
        if (nextProps.schemas === joke_generator_instance.state.schemas
            && nextProps.vocabulary === joke_generator_instance.state.vocabulary) {
            return;
        }
        joke_generator_instance.setState({
            schemas: nextProps.schemas,
            vocabulary: nextProps.vocabulary
        });

        // Later handle the deletion of a selected scheme
    }

    saveJoke() {
        joke_generator_instance.state.notifyOperationStart();
        dataWriteService
            .addNewJoke(joke_generator_instance.state.joke)
            .then(isSuccessful => {
                if (!isSuccessful) {
                    joke_generator_instance.state.notifyOperationFailed();
                    alert('Не получается сохранить шутку. Скорее всего нет соединения');
                    return;
                }
                joke_generator_instance.state.notifyRefresh();
                alert('Сохранено');
            });
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
                <h3 className="tab-title">Лэтc гоу - поехали!</h3>
                <div className="scheme-selector">
                    <select id="joke-generator-schemas-select">
                        {this.state.schemas.map((item) => <option key={item.id}>{item.name}</option>, this)}
                    </select>
                </div>

                <p className="form-control generated-joke-text" id="joke">{this.state.joke}</p>
                <div>
                    <div className="col-xs-2 col-md-1 buttons-row-right">
                        <button type="button"
                            className="btn btn-secondary btn-prev-joke generator-button"
                            disabled={!joke_generator_instance.state.previousJoke}
                            onClick={() => this.returnPreviousJoke()}><i className="fa fa-backward btn-symbol"/></button>
                    </div>
                    <div className="col-xs-8 buttons-row">
                        <button type="button"
                            className="btn btn-primary btn-generate-joke generator-button"
                            onClick={() => this.generateJoke()}>
                            <h2>Ещё!</h2>
                        </button>
                    </div>
                    <div className="col-xs-2 col-md-1 buttons-row-left">
                        <button type="button" className="btn btn-success btn-save-joke generator-button"
                                onClick={() => this.saveJoke()}>
                            <i className="fa fa-save btn-symbol"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        joke_generator_instance.initSelect();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.schemas == joke_generator_instance.state.schemas) {
            return;
        }
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