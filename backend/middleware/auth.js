const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/user");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    res.status(401).json({
      success: false,
      errors: {
        other: "Not authorized to access this route",
      },
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      errors: {
        other: "Not authorized to access this route",
      },
    });
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({
        success: false,
        errors: {
          other: "Not authorized to access this route",
        },
      });
    }
    next();
  };
};

exports.adminRegister = asyncHandler(async (req, res, next) => {
  if (req.body.secretKey === process.env.REGISTER_SECRET_KEY) {
    next();
  } else {
    res.status(400).json({
      success: false,
      errors: {
        other: "You must have a valid secret key.",
      },
    });
  }
});

// const jwt = require("jsonwebtoken");

// const secret = "test";

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers["x-access-token"];
//     const isCustomAuth = token.length < 500;

//     let decodedData;

//     if (token && isCustomAuth) {
//       decodedData = jwt.verify(token, secret);

//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = {
//   auth,
// };
