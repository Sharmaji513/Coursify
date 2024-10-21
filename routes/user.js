const { Router } = require("express");
const userModel = require("../models/userModel");
const userRouter = Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_ADMIN_PASSWORD || "asdsdfgfgrtr";

    userRouter.post("/signup", async (req, res) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            await userModel.create({
            email,
            password,
            firstName,
            lastName,
            });

            res.json({
            message: "User Signup succeeded",
            });
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    });

    userRouter.post("/signin", async (req, res) => {

        try {
            const { email, password } = req.body;

            const admin = await userModel.findOne({
                email,
                password,
            });
        
            if (admin) {
                const token = jwt.sign(
                {
                    id: admin._id,
                },
                SECRET_KEY
                );
        
                res.json({
                token: token,
                });
            } else {
                res.status(403).json({
                message: "incorrect credentials",
                });
            }
            
        } catch (error) {
            res.status(500).json({ error: err.message });
        }

    });

    
    userRouter.get("/purchases", function (req, res) {
    res.json({
        message: "purchases endpoint",
    });
    });

module.exports = {
  userRouter: userRouter,
};
