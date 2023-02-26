const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const mid = require("../middleware/mid");

router.post("/register", userController.createUser);

router.post("/login", userController.login, bookController.getBook);

router.post(
  "/books",
  mid.authentication,
  mid.authorisation,
  bookController.createBook
);
router.put(
  "/books/:bookId",
  mid.authentication,
  mid.authorisation,
  bookController.updateBook
);
router.delete(
  "/books/:bookId",
  mid.authentication,
  mid.authorisation,
  bookController.deleteBook
);

module.exports = router;
