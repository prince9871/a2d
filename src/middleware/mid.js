const jwt = require("jsonwebtoken");
const booksModel = require("../models/bookModel");
const v = require("../validators/validation");
const userModel = require("../models/userModel");
let authentication = async function (req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token)
      return res
        .status(401)
        .send({ status: false, message: "token must be present" });
    token = token.split(" ").pop();
    jwt.verify(token, "a2dLogin", (err, user) => {
      if (err) {
        return res.status(401).send({ status: false, message: err.message });
      }
      req.userLoggedIn = user;

      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

let authorisation = async function (req, res, next) {
  try {
    req.BookId = req.params.bookId;
    let bodyUserId = await userModel.findOne({ _id: req.userLoggedIn.userId });
    if (!req.BookId) {
      if (!bodyUserId)
        return res
          .status(201)
          .send({ status: false, message: "UserId is mandatory" });
      if (!v.isValidObjectId(bodyUserId))
        return res
          .status(400)
          .send({ status: false, message: "valid userId is mandatory" });

      if (req.userLoggedIn.userId != bodyUserId._id)
        return res
          .status(403)
          .send({
            status: false,
            message: "Failed Authorisation Check Your Inputs",
          });
    }

    if (req.BookId) {
      if (!v.isValidObjectId(req.BookId))
        return res
          .status(400)
          .send({ status: false, message: "bookId is not valid" });

      req.book = await booksModel.findOne({ _id: req.BookId });
      if (!req.book)
        return res
          .status(404)
          .send({ status: false, message: "BookId not exist" });

      let userId = req.book.userId;
      if (req.userLoggedIn.userId != userId)
        return res
          .status(403)
          .send({ status: false, message: "User is unauthorised" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { authentication, authorisation };
