const http = require('http'),
      faye = require('faye'),
      config = require('./config');

const bayeux = new faye.NodeAdapter({
  mount: config.get('faye.mount'),
  timeout: config.get('faye.timeout')
});

// Handle non-Bayeux requests
const server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello stranger');
});

const serverAuth = {
  incoming: function(message, callback) {
    if (message.channel !== '/messages') return callback(message);
    const msgToken = message.ext && message.ext.secret;
    const secret = config.get('faye.secret');
    if (secret !== msgToken) message.error = 'Invalid subscription auth token';
    callback(message);
  }
};
bayeux.addExtension(serverAuth);

bayeux.attach(server);

module.exports = server;
