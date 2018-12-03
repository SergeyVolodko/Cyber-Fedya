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
            //localStorage.setItem('id_token', null);
            //localStorage.setItem('access_token', null);
            authorizationClient.revokeToken(successHandler, failureHandler);
            //{
            //    // wait until token is filled
            //}
            //while (!localStorage.getItem('id_token'));
            
        }
    }
}

var authorizationService = new AuthorizationService();

//function getAuthorizationToken() {
//    if (!authorizationClient.isAuthenticated()) {
//        if (localStorage.getItem('id_token')) {
//            authorizationClient.revokeToken();
//        } else {
//            authorizationClient.login();
//        }
//    }
//    return localStorage.getItem('id_token');
//}