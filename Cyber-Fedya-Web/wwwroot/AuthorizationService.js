var authorizationClient = new Auth0Client();

class AuthorizationService extends React.Component {
    constructor() {
        super();

        this.authorize = this.authorize.bind(this);
    }

    authorize(successHandler, failureHandler) {
        if (authorizationClient.isAuthenticated()) {
            successHandler();
            return;
        }
        if (!localStorage.getItem('id_token')) {
            authorizationClient.login();
        } else {
            authorizationClient.revokeToken(successHandler, failureHandler);
        }
    }
}

var authorizationService = new AuthorizationService();