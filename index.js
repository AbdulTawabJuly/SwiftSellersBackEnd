const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// const SQLiteStore = require("connect-sqlite3")(session);
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("./model/User");
const { createProduct } = require("./controller/Product");
const productsRouters = require("./routes/Products");
const categoriesRouters = require("./routes/Categories");
const brandsRouters = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");

const SECRET_KEY = "SECRET_KEY";
//JWT Options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

//middleware
server.use(express.static("build"));
server.use(cookieParser());
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // dont save session if un modifies
    saveUninitialized: false, // dont create session untill something stored
  })
);
server.use(passport.authenticate("session"));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
); // for cross origin problem (aik server se doosre server call ni kar sakte)
server.use(express.json()); //to parse req.body
server.use("/products", isAuth(), productsRouters.router);
server.use("/categories", isAuth(), categoriesRouters.router);
server.use("/brands", isAuth(), brandsRouters.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), ordersRouter.router);

//Passport Strategies
passport.use(
  "local", //this is only name

  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    console.log(email);
    try {
      const user = await User.findOne({ email: email });
      console.log("user", user);
      if (!user) {
        done(null, false, { message: "User Not Found" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid Password" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);

          done(null, { id: user.id, role: user.role });
        }
      );
    } catch (err) {
      console.log("catch", err);
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
// this create session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});




//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51NoQGmSDkACrq3oOCKvupOYTvJadCs6ErCYcArqHezd5zJcsJ3gRq97t6CVBLEbOi5TLSKpRomIDJ0muzRL9a5lq003WgZV7oc');
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

server.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/swiftsellers");
  console.log("Databse Connected");
}

server.listen(8080, () => {
  console.log("Server is running");
  //This is a call back function to show port kis state mai hai
});
