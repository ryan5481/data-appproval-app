const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config()

const userRoutes = require("./05-routes/04-user/00-userAuthRoutes.js")
const initiatorRoutes = require("./05-routes/03-initiator/00-initiatorAuthRoutes.js")
const adminRoutes = require("./05-routes/02-admin/00-adminAuthRoutes.js")
const superAdminRoutes = require("./05-routes/01-superAdmin/00-superAdminAuthRoutes.js")

const connectDb = require('./01-database/connectDB.js');


const port = process.env.PORT || 8000;

connectDb()

app.use(express.json());
app.use(cors());
//USER
app.use("/", userRoutes)
app.use("/", initiatorRoutes)
app.use("/", adminRoutes)
app.use("/", superAdminRoutes)

//ADMIN


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
