class JokeGenerator extends React.Component{
    joke_generator_instance = null;

    constructor(props) {
        super();
        this.state = {
            vocabulary: props.vocabulary,
            schemas: props.schemas,
            selected_scheme_index: 0,
            selected_scheme_id: null,
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
        joke_generator_instance.executeSelectSchemeBy('name', selectedSchemeName);
    }

    executeSelectSchemeBy(propName, value) {
        var index = joke_generator_instance.state.schemas
            .findIndex(s => { return s[propName] === value; });

        var newId = index === -1 ? null : joke_generator_instance.state.schemas[index].id;

        joke_generator_instance.setState( {
            selected_scheme_index: index,
            selected_scheme_id: newId
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

        if (!joke_generator_instance.state.selected_scheme_id) {
            joke_generator_instance.setState({
                selected_scheme_id: nextProps.schemas.length === 0 ? null : nextProps.schemas[0].id
            });
        }

        // Later handle the deletion of a selected scheme
    }

    saveJoke() {
        joke_generator_instance.state.notifyOperationStart();
        dataWriteService
            .addNewJoke(joke_generator_instance.state.joke)
            .then(isSuccessful => {
                if (!isSuccessful) {
                    joke_generator_instance.state.notifyOperationFailed();
                    toastr.error("Не удалось сохранить шутку", "Ошибка");
                    return;
                }
                joke_generator_instance.state.notifyRefresh();

                toastr.success("Шутка успешно сохранена", "Сохранено");
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
        var schemesOptions = joke_generator_instance.state.schemas.map((item) => 
            <option key={item.id}>{item.name}</option>,
            joke_generator_instance);

        return (
            <div>
                <p className="tab-title">Лэтc гоу - поехали!</p>
                <div className="scheme-selector">
                    <select id="joke-generator-schemas-select">
                        {schemesOptions}
                    </select>
                </div>

                <p className="form-control generated-joke-text" id="joke">{joke_generator_instance.state.joke}</p>
                <div>
                    <div className="col-xs-2 col-md-1 buttons-row-right">
                        <button type="button"
                            className="btn btn-primary btn-prev-joke generator-button"
                            disabled={!joke_generator_instance.state.previousJoke}
                            onClick={() => joke_generator_instance.returnPreviousJoke()}><i className="fa fa-backward btn-symbol"/></button>
                    </div>
                    <div className="col-xs-8 buttons-row">
                        <button type="button"
                            className="btn btn-primary btn-generate-joke generator-button"
                            onClick={() => joke_generator_instance.generateJoke()}>
                            <h2>Ещё!</h2>
                        </button>
                    </div>
                    <div className="col-xs-2 col-md-1 buttons-row-left">
                        <button type="button" className="btn btn-success btn-save-joke generator-button"
                            onClick={() => joke_generator_instance.saveJoke()}
                            disabled={!joke_generator_instance.state.joke}>
                            <i className="fa fa-save btn-symbol"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Got called after render
    componentDidMount() {
        joke_generator_instance.initSelect();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.schemas == joke_generator_instance.state.schemas) {
            return;
        }
        joke_generator_instance.initSelect();
        var id = prevState.selected_scheme_id;
        if (id) {
            joke_generator_instance.executeSelectSchemeBy('id', id);
        }
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