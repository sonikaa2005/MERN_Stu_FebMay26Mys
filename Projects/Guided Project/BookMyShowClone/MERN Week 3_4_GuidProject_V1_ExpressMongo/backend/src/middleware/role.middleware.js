// Role middleware: RBAC (Role-Based Access Control)
// This middleware checks if the user has the required role to access a specific route.

exports.authorize = (...roles) => {
    return (req,res,next) => {
        if(!req.user || !roles.includes(req.user.role)) {
             return res.status(403).json({ // 403 is for forbidden(access denied)
                success: false,
                message: "Access denied: insufficient permissions",
            });
        }
        next();
    };
};