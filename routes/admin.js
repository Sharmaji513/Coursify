const { Router } = require("express");
const adminModel = require("../models/adminModel");
const courseModel = require("../models/courseModel");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { adminMiddleware } = require("../middlewares/admin");

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
  } catch (err) {
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


//Admin  createcourse
adminRouter.post("/course", adminMiddleware, async function (req, res) {

  const adminId = req.userId

  const {title , description , imageUrl ,price}= req.body;


  const course = await courseModel.create({
    title: title, 
    description: description, 
    imageUrl: imageUrl, 
    price: price, 
    creatorId: adminId
})

  res.json({
    message: "Course created succesfully!",
    courseId: course._id
  });
});



//Admin  edit course
adminRouter.put("/course",adminMiddleware, async function (req, res) {
  const adminId = req.userId

  const {title , description , imageUrl ,price , courseId}= req.body;


  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId
    }, 

    {
    title: title, 
    description: description, 
    imageUrl: imageUrl, 
    price: price, 
})

  res.json({
    message: "Course edited succesfully!",
    courseId: course._id
  });

});


// Admin get courses (bulk)
adminRouter.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const adminId = req.userId;
    console.log("Admin ID:", adminId);

    const courses = await courseModel.find({
      courseId: adminId
    });

    console.log("Courses found:", courses);
    
    res.json({
      message: "Courses retrieved successfully",
      courses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
