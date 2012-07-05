var connect = require('./node_modules/connect');
connect.createServer(
    connect.static('..')
).listen(8080);