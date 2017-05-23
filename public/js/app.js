'use strict';

(() => {
    const App = {
        vars: {},
        varsMap: {
            logInBtn: '#logInBtn',
            logOutBtn: '#logOutBtn',
            loggedInStatus: '#loggedInStatus',
            showWhenLoggedIn: '.showWhenLoggedIn',
            hideWhenLoggedIn: '.hideWhenLoggedIn',
            friendRowLink: '.friend-row a'
        },
        init: () => {
            Auth.init(AppConfig.OauthIo);
            Model.init(AppConfig.Firebase);
            App.bindEvents();
            App.sammyInit();
        },
        sammyInit: () => {
            App.sammyApp = $.sammy('#main', (context) => {
                context.debug = true;
                context.use('Template');
                context.get('#/', Controller.main);
                context.get('#/friends', Controller.friends);
            });
            App.sammyApp.run('#/');

        },

        bindEvents: () => {
            console.log('binding events');

            App.getVar('logInBtn').on('click', App.events.onClickedLogIn);
            App.getVar('logOutBtn').on('click', App.events.onClickedLogOut);

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    App.events.onUserStateLoggedIn(user);
                } else if (!user) {
                    App.events.onUserStateLoggedOut();
                }
            });
        },
        events: {
            onClickedLogIn: (e) => {
                e.preventDefault();
                Auth.login(App.events.onLogInSuccess, App.events.onLoginFail);
            },
            onClickedLogOut: (e) => {
                e.preventDefault();
                Auth.logout();
            },
            onLogInSuccess: (response) => {

            },
            onLoginFail: (err) => {
                console.log('err', err);
            },
            onUserStateLoggedIn: (user) => {
                App.getVar('hideWhenLoggedIn').addClass('hide');
                App.getVar('showWhenLoggedIn').removeClass('hide');
                App.getVar('loggedInStatus').find('span').text(user.displayName);
                console.info('logged in');
            },
            onUserStateLoggedOut: () => {
                App.getVar('hideWhenLoggedIn').removeClass('hide');
                App.getVar('showWhenLoggedIn').addClass('hide');
                App.getVar('loggedInStatus').find('span').text('');
                console.info('logged out');
            }
        },
        listeners: [
            function onLoggedIn() {
                console.log('sup');
            }
        ],
        getVar: (name) => {
            if (!_.has(App.vars, name)) {
                App.vars[name] = $(App.varsMap[name]);
            }

            return App.vars[name];
        },
        sammyApp: null
    };

    App.init();
})();
