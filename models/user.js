const Mongoose = require('mongoose');
const Validator = require('validator');
const Jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');

const userSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate (value) {
            if (!Validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate (value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not contain "password"');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

/**
 * Auto strip out sensitive info
 * e.g password and tokens from user object
 */
// userSchema.methods.toJSON = function () {
//     const user = this;
//     const userObject = user.toObject();
//     delete userObject.password;
//     delete userObject.tokens;

//     return userObject;
// };

userSchema.statics.findByCredential = async (email, password) => {
    const user = User.findOne({'email': email});
    if (!user) {
        throw new Error('Unable to login');
    }
    const match = await Bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Unable to login');
    }
    
    return user;
};

/**
 * Method for generation auth tokens
 */
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = Jwt.sign({_id: user.id.toString()}, 'godDayWithUs', {expiresIn: '1 day'});
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

/**
 * Before saving the user
 */
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await Bcrypt.hash(user.password, 8);
    }
    next();
});

const User = Mongoose.model('User', userSchema);

module.exports = User;