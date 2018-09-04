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

    schemeSelected(selectedValue) {
        this.setState({
            selected_sceheme: selectedValue
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
    }

    moveDown(word) {
        if (word.orderNumber === self.state.selected_sceheme.words.length - 1) {
            return;
        }
        var next = word.orderNumber + 1;
        var next_word = self.selected_sceheme.words[next];
        word.orderNumber = next_word.orderNumber;
        next_word.orderNumber -= 1;
    }
    //onClick={this.moveUp(word)}
    //onClick={this.moveDown(word)}
    render() {

        var schemeItems = this.state.selected_sceheme.words.map((word) =>
            <li>
                <select id="words" >
                    {this.state.wordTypes.map((index, item) =>
                        <option key={index}>{item.text}</option>
                    )}
                </select>
                <button class="btn-success btn-block"><i class="fa fa-arrow-up"></i></button>
                <button class="btn-success btn-block" ><i class="fa fa-arrow-down"></i></button>
                
            </li>
        );

        return (
            <div>
                <h3>Схемы шуток</h3>
                <div>
                    <select id="schemas" onSelect={this.schemeSelected}>
                        {this.state.schemas.map((item) =>
                            <option key={item.id}>{item.name}</option>
                        )}
                    </select>
                    <button type="button" class="btn btn-success btn-lg"
                            disabled={!this.state.selected_sceheme}>
                        <i class="fa fa-save"></i>
                    </button>
                    <ul>{schemeItems}</ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        $('select').selectize({
            sortField: 'text'
        });
    }
}