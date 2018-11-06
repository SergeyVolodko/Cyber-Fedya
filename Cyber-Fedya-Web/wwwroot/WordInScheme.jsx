word_instances = [];
class WordInScheme extends React.Component{
    constructor(props){
        super();
        this.state = {
            wordTypes: globalWordTypes,
            currentWord: props.wordInJoke,
            id: "word-" + props.id + new Date().getTime(),
            moveDown: props.moveDown,
            moveUp: props.moveUp
        };
        word_instances[this.state.id] = this;
    }

    wordSelected(e, id) {
        var selectedWordText = e.params.data.text;

        word_instances[id].state.currentWord.text = selectedWordText;
    }

    render(){
        var wordOptions = this.state.wordTypes.map((wordType, index) =>
            <option key={index}>{wordType}</option>, this);

        return(
        <div class="word-in-scheme-container">
            <div class="word-type-selector">
                <button class="btn word-in-scheme-arrow-button"
                        onClick={() => this.state.moveUp(this.state.currentWord)}>
                    <i class="fa fa-arrow-up btn-symbol"></i>
                </button>
                <select id={this.state.id}
                        title={this.state.currentWord.text}>
                    {wordOptions}
                </select>
                <button class="btn word-in-scheme-arrow-button"
                        onClick={() => this.state.moveDown(this.state.currentWord)}>
                    <i class="fa fa-arrow-down btn-symbol"></i>
                </button>
            </div>
        </div>);
    }

    componentDidMount() {
        var id = this.state.id;
        var wordSelect = $('#' + id);
        wordSelect.select2({
            allowClear: true,
            width: "80%",
            placeholder: this.state.currentWord.text,
            tags: true,
            createTag: select2CreateTag
        }).val("").trigger('change');
        wordSelect.on('select2:select', function (value) { word_instances[id].wordSelected(value, id) });
    }
}