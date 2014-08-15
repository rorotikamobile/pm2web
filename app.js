GLOBAL._ = require('underscore');
GLOBAL.NODE_ENV = process.env.NODE_ENV || 'development';

var server = require('./server'),
    config = require('./config'),
    log4js = require('log4js');

if (NODE_ENV == 'production') {
    log4js.configure({
        appenders: [
            { type: 'file', filename: './prod.log' }
        ]
    });
}

server(config[NODE_ENV]);
