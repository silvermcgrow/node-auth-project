const mongoose = require('mongoose');
const Schecma = mongoose.Schema;

const UserSchema = new Schecma({
    fullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    createtAt:{
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;