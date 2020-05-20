const Express = require('express');
const Route = Express.Router();

Route.post('/listing', async (req, res) => {
    res.status(201).send('Listing Created');
});

Route.get('/listing:id', async (req, res) => {
    res.status(200).send('This is your listing');
});

Route.get('/listing', async (req, res) => {
    res.status(200).send('These are all your listings');
});

Route.patch('/listing:id', async (req, res) => {
    res.status(201).send('This listing have been updated');
});

Route.delete('/listing:id', async (req, res) => {
    res.status(200).send('This listing have been deleted');
});

module.exports = Route;