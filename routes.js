const routes = require('next-routes')();
//second set of parantheses makes sure to invoke the function immediately after we require it into the file

routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show') 
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new'); //url, path

module.exports = routes;