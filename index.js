const Express = require('express');
const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/user');
const Logger = require('./middleware/logger');

// import database connection file
require('./db/mongooseDb');

// Express app
const App = Express();
const Port = process.env.port || 3030;

App.use(Express.json());

// Using logger middleware
App.use(Logger);

// Using external routes
App.use(AuthRoute);
App.use(UserRoute);

App.get('/', async (req, res) => {
    res.send('Welcome to my express and node site');
});






App.listen(Port, () => {
    console.log('Server is running on port: ', Port);
});