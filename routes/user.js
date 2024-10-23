const { Router } = require("express");
const userModel = require("../models/userModel");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
const courseModel = require("../models/courseModel");

const USER_SECRET_KEY = process.env.JWT_USER_PASSWORD ;

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
                USER_SECRET_KEY
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

    //Purchasws
    userRouter.get("/purchases", userMiddleware ,async function (req, res) {
        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId,
        });
    
        let purchasedCourseIds = [];
    
        for (let i = 0; i<purchases.length;i++){ 
            purchasedCourseIds.push(purchases[i].courseId)
        }
    
        const coursesData = await courseModel.find({
            _id: { $in: purchasedCourseIds }
        })
    
        res.json({
            purchases,
            coursesData
        })
    });

module.exports = {
  userRouter: userRouter,
};
