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
        return(
        <div>
            <select id={wordSelf.state.id} title={wordSelf.state.currentWord.text}>
                {wordSelf.state.wordTypes.map((wordType, index) =>
                    <option key={index}>{wordType}</option>
                )}
            </select>
        </div>);
    }

    //<button class="btn-success btn-block"><i class="fa fa-arrow-up"></i></button>
    //<button class="btn-success btn-block" ><i class="fa fa-arrow-down"></i></button>

    componentDidMount() {
        var id = this.state.id;
        $('#'+id).select2({
            allowClear: true,
            tags: true,
            placeholder: this.state.currentWord.text,
            createTag: function (params) {
              return {
                id: params.term,
                text: params.term,
                newOption: true
              }
            }
        }).val("").trigger('change');
    }
}