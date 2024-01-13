const routes = require('next-routes')();
//second set of parantheses makes sure to invoke the function immediately after we require it into the file

routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show'); //url, path

module.exports = routes;