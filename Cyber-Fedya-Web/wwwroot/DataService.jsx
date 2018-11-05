class DataService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vocabulary: [],
            schemas: [],
            apiRepository: props.apiRepository
        };
    }

    componentDidMount() {
    }

    getVocabulary() {
        if (this.state.vocabulary.length === 0) {
            var data = this.state.apiRepository.getRequest("vocabulary");
            this.state.vocabulary = data;
        }

        return this.state.vocabulary;
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