class AuthorizationService extends React.Component {
    constructor(props) {
        super(props);

        this.authorizationClient = props.authorizationClient;
        this.apiRepository = props.apiRepository;

        this.authorize = this.authorize.bind(this);
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
            this.authorizationClient.revokeToken(successHandler, failureHandler);
        }
    }
}