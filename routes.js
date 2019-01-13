const routes = require("next-routes")(); // we need to invoke the funcion returned by next-routes

routes
    .add('/campaigns/new', '/campaigns/new')    // overrides the next route
    .add('/campaigns/:address', '/campaigns/show') // : defines its a wild card
    .add('/campaigns/:address/requests', 'campaigns/requests/index');
// this will help export helpers for users to navigate and helps generate link tags in the components
module.exports = routes; 