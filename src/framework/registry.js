/**
 * @param {string[]} properties 
 */
const mapNamesToProperties = (properties) => properties.reduce((obj, propertyKey) => ({
  ...obj,
  [propertyKey]: {}
}), {});

class Registry {

  /**
   * Initializes a registry with specified scopes
   * @param {string[]} scopeNames 
   */
  constructor(scopeNames) {
    this.scopeNames = scopeNames;
    /**
     * @type {framework.di.IResolverRegistry}
     */
    this.scopes = mapNamesToProperties(scopeNames);

  }

  /**
   * 
   * @param {string} dependency 
   * @param {framework.di.IDependencyProvider} provider
   * @param {string} scope 
   */
  add(dependency, provider, scope) {
    if (this.scopes[scope] === void 0) throw `Unknown scope ${scope}`;
    if (this.scopes[scope][dependency] !== void 0) throw `Duplicate dependency ${dependency} in scope ${scope}`;

    this.scopes[scope][dependency] = provider;
  }

  createContainer() {
    return new Container(this);
  }

}

class Container {

  /**
   * @param {Registry} registry 
   */
  constructor(registry) {
    this.registry = registry;
    this.cache = mapNamesToProperties(registry.scopeNames);
    this.resolveStack = [];
  }

  /**
   * 
   * @param {string} dependency 
   * @param {string} scope 
   */
  resolve(dependency, scope) {
    if (!this.registry.scopeNames.includes(scope)) throw `Can't resolve dependency ${dependency} in scope ${scope} - scope: '${scope}' isn't specified.`;
    if (this.cache[scope][dependency] !== void 0) return this.cache[scope][dependency];
    if (this.registry.scopes[scope][dependency] === void 0) throw `Can't resolve dependency ${dependency} in scope ${scope} - dependency '${dependency}' isn't registered.`

    const resolveStackName = dependency + ":" + scope;
    
    if (this.resolveStack.includes(resolveStackName)) throw `Circular dependency detected ${dependency} in scope ${scope}. Dependency stack is ${JSON.stringify(this.resolveStack)}`;

    this.resolveStack.push(resolveStackName);
    const value = this.registry.scopes[scope][dependency](this.resolve.bind(this));
    this.resolveStack.pop();

    this.cache[scope][dependency] = value; // register in cache

    return value;
  }

  /**
   * 
   * @param {string} dependency 
   * @param {string} scope 
   * @param {any} value 
   */
  exject(dependency, scope, value) {
    this.cache[scope][dependency] = value;
  }

  burnCacheScoped(scopeName) {
    if (!this.registry.scopeNames.includes(scope)) throw `Can't clear cache for scope ${scopeName} - cope: '${scope}' isn't specified.`;
    this.cache[scopeName] = {};
  }

  burnCache() {
    this.cache = mapNamesToProperties(this.registry.scopeNames);
  }

  copy() {
    var _copy = new Container(this.registry);

    this.registry.scopeNames.forEach(scope => { // for each scope
      _copy.cache[scope] = { ...this.cache[scope] }; // make shallow copy of current cache scope
    });

    return _copy;
  }


}

module.exports = Registry;