class WordInScheme extends React.Component{
    wordSelf = null;
    
    constructor(props){
        super();
        this.state = {
            wordTypes: wordTypes,
            currentWord: props.wordInJoke,
            id: "word-" + new Date().getTime() //+ Math.random()
        };

        wordSelf = this;
    }

    render(){
        // var items = self.state.wordTypes.map((word) =>
        //     <li>
        //         {word}
        //     </li>
        // );
        //{self.currentWord.text}
        return(<div>
            <select id={wordSelf.state.id} title={wordSelf.state.currentWord.text}>
                {wordSelf.state.wordTypes.map((wordType, index) =>
                    <option key={index}>{wordType}</option>
                )}
            </select> 
            </div>);
    }

    componentDidMount() {
        var id = wordSelf.state.id;
        $('#' + id).select2({
            allowClear: true,
            tags: true,
            placeholder: wordSelf.state.currentWord.text,
            createTag: function (params) {
              return {
                id: params.term,
                text: params.term,
                newOption: true
              }
            }
        }).val(2).trigger('change');
    }
}