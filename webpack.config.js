function buildConfig(env) {
  return require('./webpack.' + env.NODE_ENV + '.js')(env);
}

module.exports = buildConfig;
