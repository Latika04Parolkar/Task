const express = require("express");
const passport = require('passport');
const router = new express.Router();
const xlsx = require("xlsx");
const Employee = require("../models/employee");
const app = express();
app.use(passport.initialize());

require("../controller/auth")

app.use(router);

router.get("/getemployeeinfo/:key", passport.authenticate('jwt', {session : false}), async(req,res) => {
    try{
        const searchValue = req.params.key;
        const employeeData = await Employee.find(
            {
                "$or" : [
                    {department : searchValue},
                    {designation : searchValue},
                    {gender : searchValue}
                ]
            }
        )
        console.log(employeeData);
        res.status(200).send({
            code: 200,
            status: "success",
            message: "data ok"
        });
    } catch(error){
        console.log("error", error);
        res.status(400).send({
            code: 400,
            status: "Failed",
            message: error.message,
        });
    }
})

module.exports = router;