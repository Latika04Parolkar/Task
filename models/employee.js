const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
    name : String,
    emailID : {
        type : String,
        unique : true
    },
    mobileNumber : {
        type : Number,
        unique : true
    },
    gender : String,
    department : String,
    designation : String,
    salary : Number,
    status : {
        type : String,
        enum : ['active', 'inactive']
    }
},{
    timestamps : true
});

const Employee = mongoose.model("employees", employeesSchema);

module.exports = Employee