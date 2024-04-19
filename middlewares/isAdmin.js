const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.userAuthId);
    if (user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            message: "You are not authorized to access this route",
        });
    }
});
module.exports = isAdmin;
