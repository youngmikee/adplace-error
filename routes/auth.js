const Express = require('express');
const Auth = require('../middleware/auth');
const User = require('../models/user');
const Route = Express.Router();

Route.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(404).send(e.message);
    }
});

Route.get('/logout', Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save(req.user);
        res.send();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = Route;