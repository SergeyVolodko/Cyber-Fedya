var authorizationClient = new Auth0Client();

function getAuthorizationToken() {
    if (!authorizationClient.isAuthenticated()) {
        authorizationClient.login();
    }
    return localStorage.getItem('id_token');
}