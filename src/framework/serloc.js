/**
 * 
 * @param {string} serviceId service to locate
 * @param {serloc.IServiceCache} cache cache of instantiated services
 * @param {ProviderRegistry} registry 
 * @param {string[]} stack resolve stack for detecting circular dependencies
 */
function locate_private(serviceId, cache, registry, stack) {
  if (cache[serviceId] !== void 0) return cache[serviceId];
  if (registry.providers[serviceId] === void 0) throw `Could not locate service '${serviceId}'`;

  if (stack.indexOf(serviceId) != -1) throw `Circular dependency detected for service '${serviceId}'`;
  stack.push(serviceId);

  var service = registry.providers[serviceId]((dependency) => {
    return locate_private(dependency, cache, registry, stack);
  });

  stack.pop();
  return service;
}

class SerLoc {


  /**
   * @param {ProviderRegistry} registry
   * @param {?serloc.IServiceCache} serviceCache 
   */
  constructor(registry, serviceCache) {
    this.registry = registry;
    this.serviceCache = serviceCache || {};
  }

  /**
   * 
   * @param {string} serviceId Service to locate
   */
  locate(serviceId) {
    return locate_private(serviceId, this.serviceCache, this.registry, []);
  }

  /**
   * Dirty insertion of service instances into service cache
   * @param {string} serviceId id of service 
   * @param {*} service Service instance to dirty insert into cache
   */
  exject(serviceId, service) {
    this.serviceCache[serviceId] = service;
  }

  copy() {
    return new SerLoc(this.registry, { ...this.serviceCache });
  }

}

class ProviderRegistry {

  constructor() {
    /**
     * @type {serloc.IServiceProviderRegistry}
     */
    this.providers = {};
  }

  /**
   * @param {string} serviceId 
   * @param {serloc.IServiceProvider} serviceProvider 
   */
  add(serviceId, serviceProvider) {
    if (this.providers[serviceId]) throw `Duplicate service id's ${serviceId}`;
    this.providers[serviceId] = serviceProvider;
  }

  /**
   * Instantiates the service locator
   */
  serloc() {
    return new SerLoc(this);
  }

}

module.exports = ProviderRegistry;