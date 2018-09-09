class WordInScheme extends React.Component{
    
    constructor(props){
        super();
        this.state = {
            wordTypes: wordTypes,
            currentWord: props.wordInJoke,
            id: "word-" + props.id + new Date().getTime(),
            moveDown: props.moveDown,
            moveUp: props.moveUp
        };
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
        $('#'+id).select2({
            allowClear: true,
            width: "80%",
            placeholder: this.state.currentWord.text,
            tags: true,
            createTag: select2CreateTag
        }).val("").trigger('change');
    }
}