const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("connect-flash");

/* -------------------- Show Login page -------------------- */
exports.showLogin = (req, res) => {
  res.render("login", { message: req.flash("error") });
};

/* -------------------- Show Register page -------------------- */
exports.showRegister = (req, res) => {
  res.render("register");
};

/* -------------------- Show Register page -------------------- */
exports.showProfile = (req, res) => {
  let user = req.user;
  res.render("profile", { user });
};

/* -------------------- Login page -------------------- */
exports.login = passport.authenticate("local", {
  successRedirect: "/admin/dashboard",
  failureRedirect: "/login",
  successFlash: true,
  failureFlash: true,
  successFlash: "Login Succesful!",
  failureFlash: "Invalid email or password.",
});


/* -------------------- Register page -------------------- */
exports.registerUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  let profileImage = "";
  if (user) {
    req.flash("sucess", "User already Register, Login Now");
    return res.redirect("/login");
  }
  if(req.file){
    profileImage = req.file.path.replace(/\\/g, "/");
  }
  let hashPassword = await bcrypt.hash(req.body.password, 10);
  user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    profileImage
  });
  req.flash('success_msg', 'Register Success');
  res.redirect('/login');
  // passport.authenticate("local")(req, res, () => {
  //   req.flash("success", "Registration successful. Welcome!");
  //   res.redirect("/login");
  // });
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
};