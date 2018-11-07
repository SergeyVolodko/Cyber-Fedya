class DataService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vocabulary: [],
            schemas: [],
            apiRepository: props.apiRepository
        };
    }

    // cache revocation ?
    // sync-button ?
    componentDidMount() {
    }

    getVocabulary() {
        if (this.state.vocabulary.length === 0) {
            var data = this.state.apiRepository.getRequest("vocabulary");
            this.state.vocabulary = data;
        }
        return this.state.vocabulary;
    }

    addToVocabulary(wordInput) {
        // Mocked:
        this.state.vocabulary[wordInput.type].push(wordInput.word);
    }

    createScheme(newScheme) {
        // Mocked:
        //newScheme.id = generateKey("mock_scheme_id");
        this.state.schemas.push(newScheme);
    }

    updateScheme(id, schemeToUpdate) {
        // Mocked:
        var index = this.state.schemas.findIndex(s => { return s.id === id; });
        this.state.schemas.splice(index, 1, schemeToUpdate);
    }

    getSchemas() {
        if (this.state.schemas.length === 0) {
            var data = this.state.apiRepository.getRequest("schemas");
            // why this.setState({schemas: data}) does not work?
            this.state.schemas = data;
        }
        return this.state.schemas;
    }
}