const express = require("express");
const passport = require('passport');
const router = new express.Router();
const xlsx = require("xlsx");
const Employee = require("../models/employee");
const app = express();
app.use(passport.initialize());

require("../controller/auth")

app.use(router);

router.post("/storeinfo", passport.authenticate('jwt', {session : false}), async(req, res) => {
    try{
        let workbook = xlsx.readFile('task.xlsx')
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];

        for(let index = 2; index < 7; index++){
            const name = worksheet[`A${index}`].v;
            const emailID = worksheet[`B${index}`].v;
            const mobileNumber = worksheet[`C${index}`].v;
            const gender = worksheet[`D${index}`].v;
            const department = worksheet[`E${index}`].v;
            const designation = worksheet[`F${index}`].v;
            const salary = worksheet[`G${index}`].v;
            const status = worksheet[`H${index}`].v;
            
            const employee = new Employee({
                name,
                emailID,
                mobileNumber,
                gender,
                department,
                designation,
                salary,
                status
            })
            await employee.save();
        }

        res.status(200).send({
            code: 200,
            status: "success",
            message: `data stored in mongodb!`,
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