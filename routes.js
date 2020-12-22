const path    = require('path');
const glob    = require('glob');

module.exports = function (app) {
    'use strict';

    let routesPath  = path.normalize(global._rootPath + '/src/api');
    let globPattern = routesPath + '/**/**/index.js';

    glob(globPattern, function (err, routes) {
        if(err) {
            global.logger.error("Error while loading routes into routepath. Could not glob " + globPattern);
        } else {
            routes.forEach(function (originalRoute) {
                let routeName = path.relative(routesPath, originalRoute);
                let route = (`/${routeName}`).replace('/index.js', '');
                // Inject route
                app.use(route, require(global._rootPath + '/src/api' + route));
            });
        }
    });

};
