class AuthorizationService extends React.Component {
    constructor(props) {
        super(props);

        this.authorizationClient = props.authorizationClient;
        this.apiRepository = props.apiRepository;

        this.authorize = this.authorize.bind(this);
        this.revokeToken = this.revokeToken.bind(this);
    }

    authorize(successHandler, failureHandler) {
        if (!this.apiRepository.isOnline()) {
            failureHandler();
        }

        if (this.authorizationClient.isAuthenticated()) {
            successHandler();
            return;
        }
        if (!localStorage.getItem('access_token')) {
            this.authorizationClient.login();
        } else {
            this.revokeToken(successHandler, failureHandler);
        }
    }

    revokeToken(successHandler, failureHandler) {
        this.authorizationClient.auth0.checkSession({},
            function (err, result) {
                if (err) {
                    if (err.error === "login_required") {
                        authorizationClient.login();
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