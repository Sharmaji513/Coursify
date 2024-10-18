const express = require("express");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");

const app = express();

const PORT = 3000;


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);


app.listen(PORT, () => {
  console.log(`Server listening at  ${PORT}`);
});
