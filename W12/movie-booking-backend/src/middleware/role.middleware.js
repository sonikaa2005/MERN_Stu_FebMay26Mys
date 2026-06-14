// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\middleware\role.middleware.js
/*
-----------------------------------------
ROLE MIDDLEWARE (RBAC)
-----------------------------------------
*/

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};