const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

// Passport Local Strategy
passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            let user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: "Incorrect email." });
            }
            let isMatched = await bcrypt.compare(password, user.password);
            if(!isMatched)
                return done(null, false, { message: "Incorrect password." });
            else
                return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);
    done(null, user);
});