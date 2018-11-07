class Schemas extends React.Component{

    self = null;

    constructor(props) {
        super(props);
        this.state = {
            schemas: props.schemas,
            selected_scheme: props.schemas[0],
            wordTypes: globalWordTypes,
            notifyRefresh: props.notifyRefresh
        };

        self = this;
    }

    componentWillReceiveProps(nextProps) {
        //$('#schemas-select').empty().trigger("change");
        self.forceUpdate();
        self.initSelect();
        //var name = self.state.selected_scheme.name;
        //self.setState({
        //    //schemas: nextProps.schemas,
        //    selected_scheme: self.state.schemas[0]
        //});
        //$('#schemas-select').val("").trigger("change");
        //self.componentDidUpdate(null,null);
    }

    schemeSelected(e) {
        var selectedSchemeName = e.params.data.text;
        var scheme = this.state.schemas.find(s => { return s.name === selectedSchemeName; });
        if (!scheme) {
            scheme = {
                "name": selectedSchemeName,
                "words": clone(this.state.selected_scheme.words),
                "id": generateKey("new-scheme-id-"),
                "base_id": !self.state.selected_scheme.base_id ? this.state.selected_scheme.id : self.state.selected_scheme.base_id
            };
        }

        this.setState({
            selected_scheme: scheme
        });
    }

    moveUp(word) {
        if (word.orderNumber === 1) {
            return;
        }
        var prev = word.orderNumber - 1;
        var previous_word = self.state.selected_scheme.words[prev];
        word.orderNumber = previous_word.orderNumber;
        previous_word.orderNumber += 1;
        self.setState({ selected_scheme: self.state.selected_scheme });
    }

    moveDown(word) {
        if (word.orderNumber === self.state.selected_scheme.words.length) {
            return;
        }
        var next = word.orderNumber + 1;
        var next_word = self.state.selected_scheme.words[next];
        word.orderNumber = next_word.orderNumber;
        next_word.orderNumber -= 1;
        self.setState({ selected_scheme: self.state.selected_scheme });
    }

    createSelectedScheme() {
        dataService.createScheme(self.state.selected_scheme);
        self.state.notifyRefresh();
        //self.forceUpdate();
    }

    saveSelectedScheme() {
        var id = self.state.selected_scheme.base_id;
        self.state.selected_scheme.id = id;
        dataService.updateScheme(id, self.state.selected_scheme);
        self.state.notifyRefresh();
        //self.forceUpdate();
    }

    render() {
        var schemeItems = self.state.selected_scheme.words
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map((word, i) =>
            <div key={generateKey(i)}>
                <WordInScheme id={i}
                    wordInJoke={word}
                    moveDown={this.moveDown}
                    moveUp={this.moveUp}/>
            </div>
            ,this
        );

        return (
            <div>
                <h3>Схемы шуток</h3>
                <div>
                    <div class="scheme-selector">
                        <select id="schemas-select">
                            {self.state.schemas.map((item) =>
                                <option key={item.id} id={item.id}>{item.name}</option>
                            , this)}
                        </select>
                    </div>
                    <div class="row">
                        <button type="button" class="btn btn-warning btn-lg col-xs-5"
                            onClick={() => self.createSelectedScheme()}>
                            <i class="fa fa-file btn-symbol"></i> Сохранить как новую схему
                        </button>
                        <div class="col-xs-2"></div>
                        <button type="button" class="btn btn-warning btn-lg col-xs-5"
                            onClick={() => self.saveSelectedScheme()}>
                            <i class="fa fa-save btn-symbol"></i> Сохранить как обновления этой схемы
                        </button>
                    </div>
                    <div>{schemeItems}</div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        self.initSelect();
    }
    componentDidUpdate(prevProps, prevState) {
        //$('#schemas-select').empty().trigger("change");
        //var name = self.state.selected_scheme.name;
        //self.setState({
        //    //schemas: nextProps.schemas,
        //    selected_scheme: self.state.schemas[0]
        //});
        self.initSelect();
        //self.render();
    }

    initSelect() {
        var schemsSelect = $('#schemas-select');
        schemsSelect.select2({
            width: '100%',
            tags: true,
            createTag: select2CreateTag
        });
        schemsSelect.on('select2:select', function (value) { self.schemeSelected(value) });
    }
}