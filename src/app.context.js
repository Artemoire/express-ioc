const depContainer = require('./app.dependency-container');

const appContext = (req) => ({
    resolve(dep, scope) {
        const copy = depContainer.copy();
        copy.exject('req', 'request', req); // express integration

        return copy.resolve(dep, scope);
    }
})

module.exports = appContext;