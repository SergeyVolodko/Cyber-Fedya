class Auth0Client extends React.Component {
    // It is crucial to specify in Auth0
    // Both Allowed Callback URLs and Allowed Web Origins
    // with the host url
    // To make work both the login and the token revokation
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
                console.log(err);
            }
            localStorage.setItem("is_authentication_handled", true);
        });
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        var expiresAt = JSON.stringify((authResult.expiresIn/* * 1000*/) + new Date().getTime());
        // accessToken and idToken are mismatched in the response!
        localStorage.setItem('access_token', authResult.idToken);
        localStorage.setItem('id_token', authResult.accessToken);
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
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    login() {
        this.auth0.authorize();
    }

    revokeToken(successHandler, failureHandler) {
        this.auth0.checkSession({},
            function(err, result) {
                if (err) {
                    if (err.error==="login_required") {
                        this.login();
                    }
                    failureHandler();
                    console.log(err);
                } else {
                    authorizationClient.setSession(result);
                    successHandler();
                }
            });
    }
}

var authorizationClient = new Auth0Client();