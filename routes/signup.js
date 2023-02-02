const express = require("express");
const validator = require("validator");
const router = new express.Router();

const User = require("../models/user");
const app = express();

app.use(router);

router.post('/signup', async (req, res) => {
    try {
        if (
            req.body.name &&
            validator.isEmail(req.body.email) &&
            validator.isStrongPassword(req.body.password, {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false,
            })
        ) {
            const {name,email,password} = req.body;
            const check = await User.exists({ email });
            if (check) {
                throw new Error("User already exists!");
            } else {
                const user = User({
                    name,
                    email,
                    password
                })
                await user.save();
                res.status(200).send({
                    code: 200,
                    status: "Success",
                    message: "User signed up successfully!",
                })
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            code: 400,
            status: "Failed",
            message: error.message,
        });
    }
})

module.exports = router;