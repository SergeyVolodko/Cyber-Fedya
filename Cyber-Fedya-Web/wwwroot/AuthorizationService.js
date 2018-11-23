var authorizationClient = new Auth0Client();

function getAuthorizationToken() {
    if (!authorizationClient.isAuthenticated()) {
        if (localStorage.getItem('id_token')) {
            authorizationClient.revokeToken();
        } else {
            authorizationClient.login();
        }
    }
    return localStorage.getItem('id_token');
}