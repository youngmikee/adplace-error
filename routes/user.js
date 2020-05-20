const Express = require('express');
const User = require('../models/user');
const Auth = require('../middleware/auth');
const Route = Express.Router();

Route.get('/user', Auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

Route.post('/user', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = Route;