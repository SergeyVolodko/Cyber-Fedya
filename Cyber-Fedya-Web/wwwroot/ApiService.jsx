class ApiService extends React.Component
{
	self: null

	constructor(props) {
		super(props);
		this.state = {
			baseUrl: props.baseUrl,
			error: null,
			isLoaded: false
		};

	    self = this;
	}

	componentDidMount() {
		
	}

    getRequest(url) {
        var response = $.ajax({
            type: "GET",
            url: self.state.baseUrl + url,
            async: false
            //(error) => {
            //self.setState({
            //   isLoaded: true,
            //   error
            //})

        }).responseText;
  
        self.setState({
            isLoaded: true
        });

        return response;
    }


    getVocabulary() {
        return self.getRequest("vocabulary");
    }
}