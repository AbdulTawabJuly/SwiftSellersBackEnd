const { User } = require("../model/User");
const crypto = require("crypto"); // crypto is an in build module in node
const { sanitizeUser } = require("../services/common");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  // this product we have to get from API body
  try {
    //salt ki madad se password encrypt hota hai
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);

            res.status(201).json(token);
          }
        });
        res.status(201).json();
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  res.json(req.user);
};
// req.user aik special obeject hai jo passport bnata hai jab user authenticate ho jata hai

exports.checkUser = async (req, res) => {
  res.json(req.user);
};
