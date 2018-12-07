const emptyScheme = {
    name: "Не сохранённая схема",
    words: [],
    base_id: null,
    id: null,
}

class Schemas extends React.Component{

    shemas_instance = null;

    constructor(props) {
        super(props);
        this.state = {
            schemas: props.schemas,
            selected_scheme: props.schemas.length > 0 ? props.schemas[0] : emptyScheme,
            wordTypes: globalWordTypes,
            notifyRefresh: props.notifyRefresh
        };

        shemas_instance = this;
    }

    schemeSelected(e) {
        var selectedSchemeName = e.params.data.text;
        var scheme = this.state.schemas.find(s => { return s.name === selectedSchemeName; });
        if (!scheme) {
            scheme = {
                "name": selectedSchemeName,
                "words": clone(this.state.selected_scheme.words),
                "id": generateKey("new-scheme-id-"),
                "base_id": !shemas_instance.state.selected_scheme.base_id
                    ? this.state.selected_scheme.id
                    : shemas_instance.state.selected_scheme.base_id
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
        var previous_word = shemas_instance.state.selected_scheme.words[prev];
        word.orderNumber = previous_word.orderNumber;
        previous_word.orderNumber += 1;
        shemas_instance.setState({ selected_scheme: shemas_instance.state.selected_scheme });
    }

    moveDown(word) {
        if (word.orderNumber === shemas_instance.state.selected_scheme.words.length) {
            return;
        }
        var next = word.orderNumber + 1;
        var next_word = shemas_instance.state.selected_scheme.words[next];
        word.orderNumber = next_word.orderNumber;
        next_word.orderNumber -= 1;
        shemas_instance.setState({ selected_scheme: shemas_instance.state.selected_scheme });
    }

    createSelectedScheme() {
        dataWriteService.createScheme(shemas_instance.state.selected_scheme);
        shemas_instance.state.notifyRefresh();
    }

    saveSelectedScheme() {
        var id = !shemas_instance.state.selected_scheme.base_id
            ? shemas_instance.state.selected_scheme.id
            : shemas_instance.state.selected_scheme.base_id;
        shemas_instance.state.selected_scheme.id = id;
        dataWriteService.updateScheme(id, shemas_instance.state.selected_scheme);

        shemas_instance.state.notifyRefresh();
    }

    addNewWordToScheme() {
        var nextNumber = shemas_instance.state.selected_scheme.words.length;
        shemas_instance.state.selected_scheme.words.push({ "text": "Слово или несколько", "orderNumber": nextNumber});
        shemas_instance.forceUpdate();
    }

    deleteWordFromScheme(word) {
        var words = shemas_instance.state.selected_scheme.words;
        var index = words.indexOf(word);

        if (index < words.length )
            for (var i = index; i < words.length; i++) {

                shemas_instance.state.selected_scheme.words[i].orderNumber -= 1;
            }

        shemas_instance.state.selected_scheme.words.splice(index, 1);

        shemas_instance.forceUpdate();
    }

    render() {
        var schemeItems = shemas_instance.state.selected_scheme.words
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
                            {shemas_instance.state.schemas.map((item) =>
                                <option key={item.id}>{item.name}</option>
                            , this)}
                        </select>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-warning btn-lg col-xs-5"
                            onClick={() => shemas_instance.createSelectedScheme()}>
                            <i className="fa fa-file btn-symbol"></i> Сохранить как новую схему
                        </button>
                        <div className="col-xs-2"></div>
                        <button type="button" className="btn btn-warning btn-lg col-xs-5"
                            onClick={() => shemas_instance.saveSelectedScheme()}>
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
        shemas_instance.initSelect();
    }

    // React woodoo to keep scheme dropdowns up to date
    componentWillReceiveProps(nextProps) {
        shemas_instance.forceUpdate();
    }
    componentDidUpdate(prevProps, prevState) {
        shemas_instance.initSelect();
        // select2 woodoo to remove duplicates on schema name change saved
        var name = shemas_instance.state.selected_scheme.name;
        $('#schemas-select').val(name).trigger("change");
    }

    initSelect() {
        var schemsSelect = $('#schemas-select');
        schemsSelect.select2({
            width: '100%',
            tags: true,
            createTag: select2CreateTag
        });
        schemsSelect.on('select2:select', function (value) { shemas_instance.schemeSelected(value) });
    }
}