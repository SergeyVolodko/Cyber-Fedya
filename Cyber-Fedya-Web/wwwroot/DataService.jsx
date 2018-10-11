class DataService extends React.Component
{
    var vocabulary: [],


    DataService(props) {
		super(props);
		this.state = {
            apiRepository: props.apiRepository
		};
	}



	componentDidMount() {
	}

    getVocabulary() {
        return this.getRequest("vocabulary");
    }
}