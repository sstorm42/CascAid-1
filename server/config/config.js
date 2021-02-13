const { check } = require('express-validator');

const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    },
    default: {
        SECRET: 'j54O6D6i46T7or45dAk6S445un4eAklA435702',
        DATABASE: 'mongodb://localhost:27017/cascaid_db',
        EMAIL_USER: 'test@domain.com',
        EMAIL_PASSWORD: '12345678ABC',
    },
    test: {
        SECRET: 'j54O6D6i46T7or45dAk6S445un4eAklA435702',
        DATABASE: 'mongodb://localhost:27017/cascaid_test_db',
        EMAIL_USER: 'test@domain.com',
        EMAIL_PASSWORD: '12345678ABC',
    },
};

exports.get = function get(env) {
    return config[env] || config.default;
};
