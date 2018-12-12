class ApiRepository extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: props.baseUrl
        };
    }

    getRequest(url, onSuccess, onFailure) {
        var token = localStorage.getItem('access_token');

        $.ajax({
            type: "GET",
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: this.state.baseUrl + url,
            success: function(data) {
                onSuccess(data);
            },
            error: function(e)
            {
                onFailure();
            }
        });
    }

    postRequest(url, body, onSuccess, onFailure) {
        var token = localStorage.getItem('access_token');

        $.ajax({
            type: "POST",
            dataType: "json",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: this.state.baseUrl + url,
            data: JSON.stringify(body),
            success: function(data) {
                onSuccess(data);
            },
            error: function(e)
            {
                onFailure();
            }
        });
    }

    putRequest(url, id, body, onSuccess, onFailure) {
        var token = localStorage.getItem('access_token');

        $.ajax({
            type: "PUT",
            dataType: "json",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            url: this.state.baseUrl + url + '/' + id,
            data: JSON.stringify(body),
            success: function(data) {
                onSuccess(data);
            },
            error: function(e)
            {
                onFailure();
            }
        });
    }
}