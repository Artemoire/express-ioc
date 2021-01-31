const Registry = require('./framework/registry');

const userService = require('./services/user.service');
const moviesEndpoint = require('./endpoints/movies.endpoint');

var registry = new Registry(['request', 'global']);

registry.add('user.service', userService.resolve, 'request');
registry.add('movies.endpoint', moviesEndpoint.resolve, 'global');

const container = registry.createContainer();

module.exports = container;