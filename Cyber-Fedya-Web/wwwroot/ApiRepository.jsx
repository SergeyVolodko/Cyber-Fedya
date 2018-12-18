class ApiRepository extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: props.baseUrl
        };
    }

    isOnline() {
        var result = $.ajax({
            type: "GET",
            url: "https://" + Config.Auth0Domain + "/.well-known/openid-configuration",
            async: false

        }).responseText;

        return !!result;
    }

    getRequest(url, onSuccess, onFailure) {
        var token = localStorage.getItem('access_token');

        fetch(this.state.baseUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => onSuccess(data))
        .catch(err => onFailure());
    }

    postRequest(url, body, onSuccess, onFailure) {
        var token = localStorage.getItem('access_token');

        fetch(this.state.baseUrl + url,
                {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + token
                    }
                })
            .then(response => response.json())
            .then(result => {
                if (result.statusCode > 201)
                    onFailure();
                else
                    onSuccess();
            });
    }

    putRequest(url, id, body, onSuccess, onFailure) {
        var token = localStorage.getItem('access_token');

        fetch(this.state.baseUrl + url + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.statusCode > 201)
                onFailure();
            else
                onSuccess();
        });
    }
}