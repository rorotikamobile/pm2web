module.exports = function(io, pm2) {
    //var processIo = io.of('/chart');

    this.get('/')
        .do(function(req, res, next) {
            res.setHeader('cache-control', 'no-cache');
            next();
        })
        .render('index');

    this.get('/partials/:partial').end(function(req, res) {
        res.render('partials/' + req.params.partial);
    });

    this.get('/process').do(function(req, res, next) {
        pm2.connect(function(err) {
            pm2.list(function(err, process_list) {
                console.log(process_list);

                req.setValue('processes', process_list);
                next();
                // Disconnect to PM2
                pm2.disconnect(function() {});
            });
        });
    }).json('processes');

    this.get('/process/:name').do(function(req, res, next) {
        var procName = req.params.name;

        pm2.connect(function(err) {
            pm2.describe(procName, function(err, list) {
                if (err) console.log(err);

                req.setValue('process', list);
                next();
            });
        });
    }).json('process');

    this.post('/process/:pid/stop').do(function(req, res, next) {
        var pid = req.params.pid;

        pm2.stop(pid, function(err, proc) {
            if (err) console.log(err);
            next();
        });

    }).respond();

    this.post('/process/:pid/restart').do(function(req, res, next) {
        var pid = req.params.pid;

        pm2.restart(pid, function(err, proc) {
            if (err) console.log(err);
            next();
        });

    }).respond();
};
