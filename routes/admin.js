const { Router } = require("express");
const adminModel = require("../models/adminModel");
const adminRouter = Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_ADMIN_PASSWORD || "asdsdfgfgrtr";

// Admin singup
adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
      email,
      password,
      firstName,
      lastName,
    });

    res.json({
      message: "admin Signup succeeded",
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

// Admin singin
adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
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

adminRouter.post("/course", function (req, res) {
  res.json({
    message: "admin course endpoint",
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "admin edit course endpoint",
  });
});

adminRouter.get("/course/bulk", function (req, res) {
  res.json({
    message: "course bulk endpoint",
  });
});
module.exports = {
  adminRouter: adminRouter,
};
