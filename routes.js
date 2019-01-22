const routes = require("next-routes")(); // we need to invoke the funcion returned by next-routes

routes
    .add('/contracts/new', '/contracts/new')    // overrides the next route
    .add('/contracts/:address', '/contracts/show') // : defines its a wild card
    .add('/contracts/:address/requests', 'contracts/requests/index') // Route to show the list of requests for that contract
    .add('/contracts/:address/requests/new', 'contracts/requests/new'); // the page to create a new request
// this will help export helpers for users to navigate and helps generate link tags in the components
module.exports = routes; 