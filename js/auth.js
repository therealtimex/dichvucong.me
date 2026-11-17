const openid = OpenID({
    url: 'https://accounts.rtworkspace.com/auth/',
    realm: 'rta',
    clientId: 'C1280',
});

openid.init({
    onLoad: 'check-sso',
    silentPath: '/sso/check'
});

const handleLogin = () => {
    const loginURL = buildAuthURL('login');
    window.location.href = loginURL;
}

const handleRegister = () => {
    const registerURL = buildAuthURL('register');
    window.location.href = registerURL;
}

const handleAccountGuide = () => {
    window.location.href = '/tai-khoan/';
}

const handleLogout = () => {
    openid.getClient().logout();
}

window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleAccountGuide = handleAccountGuide;
window.handleLogout = handleLogout;

function buildAuthURL(action) {
    const kc = openid.getClient();

    const encodedLocation = encodeURIComponent(window.location.href);
    const redirectUri = `https://ai.rtworkspace.com/cpms/cpmsSite/auth?registration_code=e312d7a9a78440fce02e73408a38f1d7&redirect_url=${encodedLocation}`;

    const options = {
        redirectUri: redirectUri,
        locale: 'vi'
    }
    const authURL = action === 'login' ? kc.createLoginUrl(options) : kc.createRegisterUrl(options);
    const url = new URL(authURL);
    url.searchParams.set('kc_locale', 'vi');
    url.searchParams.set('ui_locales', 'vi');
    url.searchParams.set('lang', 'vi');
    url.searchParams.set('pc', '#0468B1');
    // Temporarily hide social login for DVC flows until Facebook login is fixed.
    url.searchParams.set('lo', '0');

    // KC RTA supports changing primary color of theme via URL param
    return url.toString();
}
