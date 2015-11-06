var config = require('./config');
var publicPort = config.server.liveReloadPorts.proxy;

module.exports = {
    project: {
      name: "{{{PROJECT_NAME}}}",
      version: "{{{PROJECT_VERSION}}}"
    },
    url: 'http://localhost:' + publicPort,
};
