const Registry = require('./framework/serloc');

const userService = require('./services/user.service');
const moviesEndpoint = require('./endpoints/movies.endpoint');

var registry = new Registry();

registry.add('user.service', userService.provider);
registry.add('movies.endpoint', moviesEndpoint.provider);

const serloc = registry.serloc();

module.exports = (req, res, next) => {
  const requestScopedSerLoc = serloc.copy();

  requestScopedSerLoc.exject('req', req);
  requestScopedSerLoc.exject('res', res);
  requestScopedSerLoc.exject('next', next);

  return requestScopedSerLoc;
};