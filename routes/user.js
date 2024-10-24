const bcrypt = require("bcrypt");
const { Router } = require("express");
const userModel = require("../models/userModel");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
const courseModel = require("../models/courseModel");

const USER_SECRET_KEY = process.env.JWT_USER_PASSWORD;



// user signup
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password : hashedPassword,
      firstName,
      lastName,
    });

    res.json({
      message: "User Signup succeeded",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// user login
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if (user && await bcrypt.compare(password, user.password)) {

      const token = jwt.sign({ id: user._id }, USER_SECRET_KEY, { expiresIn: "1h"});

      res.json({ token: token });

    } else {
      res.status(403).json({
        message: "incorrect credentials",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//user Purchasws
userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  let purchasedCourseIds = [];

  for (let i = 0; i < purchases.length; i++) {
    purchasedCourseIds.push(purchases[i].courseId);
  }

  const coursesData = await courseModel.find({
    _id: { $in: purchasedCourseIds },
  });

  res.json({
    purchases,
    coursesData,
  });
});

module.exports = {
  userRouter: userRouter,
};
