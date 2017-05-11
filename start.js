const server = require('./src/server'),
      config = require('./src/config');

const port = config.get('faye.port');
const host = config.get('faye.host');
server.listen(port, host, () => {
  console.log(`Faye server is running at ${host}:${port}`);
});
