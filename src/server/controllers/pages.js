let appConfig = require('../../config-app.js');

module.exports.home = function *() {
  yield this.render('pages/home', {
    app: appConfig
  });
};
