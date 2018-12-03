class ApiRepository extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: props.baseUrl,
            error: null,
            isLoaded: false
        };
    }

    getRequest(url, onSuccess, onFailure) {
        var token = localStorage.getItem('id_token');

        $.ajax({
            type: "GET",
            //dataType: "json",
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: this.state.baseUrl + url,
            //async: false,
            success: function(response) {
                onSuccess(JSON.parse(response));
            },
            error: function(e)
            {
                //self.setState({
                //   isLoaded: true,
                //   error
                //})
                alert(url + " :: " + e.statusText);
                onFailure();
            }
        });

        //if (!this.state) {
        //    this.state = {};
        //}
        //this.setState({
        //    isLoaded: true
        //});

        //return JSON.parse(response);
    }

    //dataType: "json",
    //crossDomain: true,
    //contentType: "application/json; charset=utf-8",
    //data: JSON.stringify(data),
}