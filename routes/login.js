const express = require("express");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = new express.Router();

const User = require("../models/user");
const app = express();

app.use(router);

const generateAuthToken = (id, userEmail) => {
    const token = jwt.sign({ id, userEmail }, "thisissoconfusing", {
      expiresIn: "1d",
    });
    return token;
  };

router.post('/login', async (req, res) => {
    try {
        if (
            req.body.email &&
            req.body.password
        ) {
            const { email , password } = req.body;
            const user = await User.findOne({ email });
            //no user found
            if(!user){
                throw new Error("User does not exists!")
            }

            //incorrect password
            if(!compareSync(password , user.password)){
                throw new Error("Incorrect Password!")
            }

            const token = generateAuthToken(user._id, user.email)
            res.status(200).send({
                code: 200,
                status: "success",
                message: `${user.name} Login Successful!`,
                token,
              });
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