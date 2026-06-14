// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\server.js
// Load environment variables
require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/db");

/*
-----------------------------------------
CONNECT DATABASE
-----------------------------------------
*/
connectDB();
/*
-----------------------------------------
PORT CONFIGURATION
-----------------------------------------
*/
const PORT = process.env.PORT || 5000;
/*
-----------------------------------------
START SERVER
-----------------------------------------
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});