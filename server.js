var logger = require('log4js').getLogger(),
    path = require('path'),
    log4js = require('log4js');

module.exports = function(config) {
    var express = require('express'),
        compression = require('compression'),
        favicon = require('serve-favicon'),

        app = express(),
        server = require('http').Server(app),
        io = require('socket.io')(server),
        byword = require('byword')(app),
        pm2 = require('pm2'),

        startupWarning = 'Busy with uglify and minify, may take up to a minute.';


    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(compression());

    app.use('/public', express.static(__dirname + '/public'));

    if (NODE_ENV == 'production') {
        logger.warn(startupWarning);
        console.warn(startupWarning);
    }

    app.use(require("connect-assets")({
        paths: [path.join(__dirname, 'public')],
        helperContext: app.locals,
        servePath: '/public'
    }));
    app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));

    byword.dep('pm2', pm2)
        .dep('io', io)
        .init();

    server.listen(config.host.port, function() {
        logger.info('Server started on localhost:%d as "%s"', config.host.port, NODE_ENV);
    });
};
