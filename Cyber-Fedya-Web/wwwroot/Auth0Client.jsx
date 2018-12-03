class Auth0Client extends React.Component {

    constructor() {
        super();
        this.auth0 = new auth0.WebAuth({

            redirectUri: window.location.href,
            responseType: 'token id_token',
            scope: 'openid offline_access'
        });

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.revokeToken = this.revokeToken.bind(this);
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                location.hash = "";
                location.pathname = "";
            } else if (err) {
                location.pathname = "";
                //location.pathname = "/error.html";
                console.log(err);
            }
            localStorage.setItem("is_authentication_handled", true);
        });
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        // accessToken and idToken are mismatched in the response!
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    isAuthenticated() {
        // Check whether the current time is past the 
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    login() {
        this.auth0.authorize();
    }

    revokeToken(successHandler, failureHandler) {
        this.auth0.renewAuth({},
            function(err, result) {
                if (err) {
                    if (err.error==="login_required") {
                        this.login(successHandler, failureHandler);
                    }
                    failureHandler();
                    console.log(err);
                } else {
                    setSession(result);
                    successHandler();
                }
            });
    }
}