const _ = require('lodash')
    , yaml = require('js-yaml');

let nconf = require('nconf');

const env = process.env.NODE_ENV || 'development';

nconf = nconf.env({
  separator: '__',
  lowerCase: true
});

nconf = nconf.file('env-configs', {
  file: `${__dirname}/config.${env}.yml`,
  format: {
    parse: yaml.safeLoad,
    stringify: yaml.safeDump
  }
});

nconf = nconf.file('default-configs', {
  file: `${__dirname}/config.yml`,
  format: {
    parse: yaml.safeLoad,
    stringify: yaml.safeDump
  }
});

module.exports = {
  get(path, defaultValue) {
    const value = nconf.get(path.replace('.', ':'));
    if (value !== undefined) return value;
    return defaultValue;
  }
};
