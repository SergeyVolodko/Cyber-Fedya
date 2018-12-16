const emptyScheme = {
    name: "Не сохранённая схема",
    words: [],
    base_id: null,
    id: null,
}

class Schemas extends React.Component{

    schemes_instance = null;

    constructor(props) {
        super(props);
        this.state = {
            schemas: props.schemas,
            selected_scheme: props.schemas.length > 0 ? props.schemas[0] : emptyScheme,
            wordTypes: globalWordTypes,
            notifyRefresh: props.notifyRefresh,
            notifyOperationStart: props.notifyOperationStart,
            notifyOperationFailed: props.notifyOperationFailed
        };

        schemes_instance = this;
    }

    schemeSelected(e) {
        var selectedSchemeName = e.params.data.text;
        var scheme = this.state.schemas.find(s => { return s.name === selectedSchemeName; });
        if (!scheme) {
            scheme = {
                "name": selectedSchemeName,
                "words": clone(this.state.selected_scheme.words),
                "id": generateKey("new-scheme-id-"),
                "base_id": !schemes_instance.state.selected_scheme.base_id
                    ? this.state.selected_scheme.id
                    : schemes_instance.state.selected_scheme.base_id
            };
        }

        this.setState({
            selected_scheme: scheme
        });
    }

    moveUp(word) {
        if (word.orderNumber === 0) {
            return;
        }
        var prev = word.orderNumber - 1;
        var previous_word = schemes_instance.state.selected_scheme.words[prev];
        word.orderNumber = previous_word.orderNumber;
        previous_word.orderNumber += 1;
        schemes_instance.setState({ selected_scheme: schemes_instance.state.selected_scheme });
    }

    moveDown(word) {
        if (word.orderNumber === schemes_instance.state.selected_scheme.words.length) {
            return;
        }
        var next = word.orderNumber + 1;
        var next_word = schemes_instance.state.selected_scheme.words[next];
        word.orderNumber = next_word.orderNumber;
        next_word.orderNumber -= 1;
        schemes_instance.setState({ selected_scheme: schemes_instance.state.selected_scheme });
    }

    createSelectedScheme() {
        schemes_instance.state.notifyOperationStart();
        dataWriteService
            .createScheme(schemes_instance.state.selected_scheme)
            .then(isSuccessful => {
                if (!isSuccessful) {
                    schemes_instance.state.notifyOperationFailed();
                    return;
                }
                schemes_instance.state.notifyRefresh();
                alert('Сохранено');
            });
    }

    saveSelectedScheme() {
        schemes_instance.state.notifyOperationStart();
        var id = !schemes_instance.state.selected_scheme.base_id
            ? schemes_instance.state.selected_scheme.id
            : schemes_instance.state.selected_scheme.base_id;
        schemes_instance.state.selected_scheme.id = id;

        dataWriteService.updateScheme(id, schemes_instance.state.selected_scheme)
            .then(isSuccessful => {
                if (!isSuccessful) {
                    schemes_instance.state.notifyOperationFailed();
                    return;
                }
                schemes_instance.state.notifyRefresh();
                alert('Схема обновлена');
            });
    }

    addNewWordToScheme() {
        var nextNumber = schemes_instance.state.selected_scheme.words.length;
        schemes_instance.state.selected_scheme.words.push({ text: "Слово или несколько", orderNumber: nextNumber });
        schemes_instance.forceUpdate();
    }

    deleteWordFromScheme(word) {
        var words = schemes_instance.state.selected_scheme.words;
        var index = words.indexOf(word);

        if (index < words.length )
            for (var i = index; i < words.length; i++) {

                schemes_instance.state.selected_scheme.words[i].orderNumber -= 1;
            }

        schemes_instance.state.selected_scheme.words.splice(index, 1);

        schemes_instance.forceUpdate();
    }

    render() {
        var schemeItems = schemes_instance.state.selected_scheme.words
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map((word, i) =>
            <div key={generateKey(i)}>
                <WordInScheme id={i}
                    wordInJoke={word}
                    moveDown={this.moveDown}
                    moveUp={this.moveUp}
                    delete={this.deleteWordFromScheme} />
            </div>
            ,this
        );

        return (
            <div>
                <h3>Схемы шуток</h3>
                <div>
                    <div className="scheme-selector">
                        <select id="schemas-select">
                            {schemes_instance.state.schemas.map((item) =>
                                <option key={item.id}>{item.name}</option>
                            , this)}
                        </select>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-warning btn-lg col-xs-5"
                            onClick={() => schemes_instance.createSelectedScheme()}>
                            <i className="fa fa-file btn-symbol"></i> Сохранить как новую схему
                        </button>
                        <div className="col-xs-2"></div>
                        <button type="button" className="btn btn-warning btn-lg col-xs-5"
                            onClick={() => schemes_instance.saveSelectedScheme()}>
                            <i className="fa fa-save btn-symbol"></i> Сохранить как обновления этой схемы
                        </button>
                    </div>
                    <div>{schemeItems}</div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success btn-lg col-xs-12"
                        onClick={() => this.addNewWordToScheme()}><i className="fa fa-plus"></i></button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        schemes_instance.initSelect();
    }

    // React woodoo to keep scheme dropdowns up to date
    componentWillReceiveProps(nextProps) {
        if (nextProps.schemas === this.state.schemas) {
            return;
        }
        this.setState({
            schemas: nextProps.schemas
        });
        if (this.state.selected_scheme == emptyScheme) {
            this.setState({
                selected_scheme: nextProps.schemas[0]
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.schemas == schemes_instance.state.schemas) {
            return;
        }
        schemes_instance.initSelect();
        // select2 woodoo to remove duplicates on schema name change saved
        var name = schemes_instance.state.selected_scheme.name;
        $('#schemas-select').val(name).trigger("change");
    }

    initSelect() {
        var schemsSelect = $('#schemas-select');
        schemsSelect.select2({
            width: '100%',
            tags: true,
            createTag: select2CreateTag
        });
        schemsSelect.on('select2:select', function (value) { schemes_instance.schemeSelected(value) });
    }
}