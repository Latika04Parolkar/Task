const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true
    },
    password : String,
},{
    timestamps : true
});

usersSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password =  bcrypt.hashSync(user.password, 10)
    }

    next()
})

const User = mongoose.model("users", usersSchema);

module.exports = User