const logger = (req, res, next) => {
    // console.log('Logging request path...', req.body.email, req.body.password);
    next();
};

module.exports = logger;