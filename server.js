const { createServer } = require('http');
const next = require('next');

const app = next ({
   dev: process.env.NODE_ENV !== 'production'  // production or development mode
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

//make the app listen to a port, a callback function for the error
app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if (err) throw err;
        console.log('Ready on localhost:3000');
    });
});