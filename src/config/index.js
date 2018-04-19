import merge from 'lodash.merge';

const env = process.env.NODE_ENV;

// By default the config is baseConfig
const baseConfig = {
  port: 3000,
  secrets: {},
  db: {
    url: 'mongodb://localhost/jams'
  }
}

// if NODE_ENV is set, overwrite the default rules.
let envConfig = {};

console.log('env', env);
switch (env) {
  case 'development':
  case 'dev':
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig);
