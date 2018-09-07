class ApiService extends React.Component
{
	//self: null

    constructor(props) {
		super(props);
		this.state = {
			baseUrl: props.baseUrl,
			error: null,
			isLoaded: false
		};
	}

	componentDidMount() {
	}

    getRequest(url) {
        var response = $.ajax({
            type: "GET",
            url: this.state.baseUrl + url,
            async: false
            //(error) => {
            //self.setState({
            //   isLoaded: true,
            //   error
            //})

        }).responseText;

        if (!this.state) {
            this.state = {};
        }
        this.setState({
            isLoaded: true
        });

        return JSON.parse(response);
    }


    getVocabulary() {
        return this.getRequest("vocabulary");
    }
}