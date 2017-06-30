/* eslint-env node */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'europeana-search',
        environment: environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
            API_KEY: 'V2ENkYBGV',
            PRIVATE_KEY: 'NhVq4SX2g',
            API_HOST: 'https://www.europeana.eu',
            API_NAMESPACE: 'api/v2'
        },

        contentSecurityPolicy: {
            'default-src': "'none'",
            'script-src': "'self'",
            'font-src': "'self' fonts.gstatic.com",
            'connect-src': "'self' https://www.europeana.eu",
            'img-src': "'self'",
            'style-src': "'self' fonts.googleapis.com",
            'media-src': "'self'"
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    // if (environment === 'production') {
    //
    // }

    return ENV;
};
