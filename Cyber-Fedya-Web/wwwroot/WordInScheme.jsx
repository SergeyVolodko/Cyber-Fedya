class WordInScheme extends React.Component{
    wordSelf = null;
    
    constructor(props){
        super();
        this.state = {
            wordTypes: wordTypes,
            currentWord: props.wordInJoke,
            id: "word-" + props.id + new Date().getTime()
        };
        wordSelf = this;
    }

    render(){
        var wordOptions = wordSelf.state.wordTypes.map((wordType, index) =>
            <option key={index}>{wordType}</option>);

        return(
        <div class="word-in-scheme-container">
            <div class="word-type-selector">
                <button class="btn-success word-in-scheme-arrow-button"><i class="fa fa-arrow-up"></i></button>
                <select id={wordSelf.state.id} title={wordSelf.state.currentWord.text}>
                    {wordOptions}
                </select>
                <button class="btn-success word-in-scheme-arrow-button" ><i class="fa fa-arrow-down"></i></button>
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