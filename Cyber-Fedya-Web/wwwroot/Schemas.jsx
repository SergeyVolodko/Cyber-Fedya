class Schemas extends React.Component{

    self = null;

    constructor() {
        super();
        var schemas = apiService.getRequest("schemas");
        this.state = {
            schemas: schemas,
            selected_sceheme: schemas[0],
            wordTypes: wordTypes
        };

        self = this;
    }

    schemeSelected(e) {
        var selectedSchemeName = e.params.data.text;
        var scheme = this.state.schemas.find(s => { return s.name === selectedSchemeName; });
        if (!scheme) {
            scheme = new {
                "name": selectedSchemeName,
                "words": this.state.selected_sceheme.words,
                "id": this.state.selected_sceheme.id
            };
        }

        this.setState({
            selected_sceheme: scheme
        });
    }

    moveUp(word) {
        if (word.orderNumber === 0) {
            return;
        }
        var prev = word.orderNumber - 1;
        var previous_word = self.state.selected_sceheme.words[prev];
        word.orderNumber = previous_word.orderNumber;
        previous_word.orderNumber += 1;
        self.setState({selected_sceheme: self.state.selected_sceheme});
    }

    moveDown(word) {
        if (word.orderNumber === self.state.selected_sceheme.words.length - 1) {
            return;
        }
        var next = word.orderNumber + 1;
        var next_word = self.state.selected_sceheme.words[next];
        word.orderNumber = next_word.orderNumber;
        next_word.orderNumber -= 1;
        self.setState({selected_sceheme: self.state.selected_sceheme});
    }


    render() {
        var schemeItems = this.state.selected_sceheme.words
            .sort((a, b) => a.orderNumber > b.orderNumber)
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
                            {this.state.schemas.map((item) =>
                                <option key={item.id}>{item.name}</option>
                            , this)}
                        </select>
                    </div>
                    <div class="row">
                        <button type="button" class="btn btn-warning btn-lg col-xs-5">
                            <i class="fa fa-file btn-symbol"></i> Сохранить как новую схему
                        </button>
                        <div class="col-xs-2"></div>
                        <button type="button" class="btn btn-warning btn-lg col-xs-5">
                            <i class="fa fa-save btn-symbol"></i> Сохранить как обновления этой схемы
                        </button>
                    </div>
                    <div>{schemeItems}</div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        var schemsSelect = $('#schemas-select');
        schemsSelect.select2({
            width: '100%',
            tags: true,
            createTag: select2CreateTag
        });
        schemsSelect.on('select2:select', function (value) { self.schemeSelected(value)});
    }
}