const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./Models/Person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    //autheintication logic  here

    try {
      //console.log("Recived Crededntails", USERNAME, password);

      const user = await Person.findOne({ username: USERNAME });

      //if username matched with USERNAME  then

      if (!user) {
        return done(error, false, { message: "Incorrect username" });
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;

// export configured passport
