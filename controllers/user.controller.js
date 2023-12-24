require("dotenv").config();
const User = require("../models/User");
const { generateToken } = require("../utilis/token");

exports.createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        status: "fail",
        message: "Already This Email Exist!",
      });
    }
    const result = await User.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Thanks for create Account",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "user not Added",
      error: error.message,
    });
  }
};
exports.createLogin = async (req, res) => {
  //    console.log(req.body)
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Sorry Not Found Your Account ! Please Create a Account !",
      });
    }

    const isValidPassword = user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({
        status: "fail",
        message: "Sorry ! Your password or email wrong",
      });
    }
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Thanks For Login",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Not Found Your Account",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const email = req?.user?.email;
    const user = await User.findOne({ email });
    const { password: pwd, ...others } = user?.toObject();
    res.status(200).json({
      status: "success",
      data: others,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Please Log in",
      error: error.message,
    });
  }
};

exports.allUser = async (req, res) => {
  try {
    // const email =  req?.user?.email
    const user = await User.find({});
    //  const {password:pwd2, ...others} = user?.toObject();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "no user found",
      error: error.message,
    });
  }
};
