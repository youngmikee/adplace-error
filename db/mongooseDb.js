const Mongoose = require('mongoose');

Mongoose.connect('mongodb://127.0.0.1:27017/adplace-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("Database connection is successful");
}).catch((e) => {
    console.log("Error: ", e);
});