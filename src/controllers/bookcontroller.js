const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");
const v = require("../validators/validation");

//_______________________________________________________________createBook___________________________________________
const createBook = async function (req, res) {
  try {
    //let requestBody = req.body
    let { title, author, price } = req.body;
    let userIds = req.userLoggedIn;

    let requestBody = {
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      userId: userIds.userId,
    };

    if (!requestBody) {
      return res
        .status(400)
        .send({ status: false, message: "Book data is required in body" });
    }

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "Title is mandatory" });
    }

    if (await bookModel.findOne({ title: title })) {
      return res
        .status(400)
        .send({ status: false, message: "Title already exists" });
    }

    if (!author) {
      return res
        .status(400)
        .send({ status: false, message: "Author is mandatory" });
    }

    if (!price) {
      return res
        .status(400)
        .send({ status: false, message: "Price must be present" });
    }

    let bookData = await bookModel.create(requestBody);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: bookData });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//_________________________________________________________getBook_______________________________________________________
const getBook = async function (req, res) {
  try {
    let requiredData = await bookModel
      .find({ userId: userDatas, isDeleted: false })
      .select({ createdAt: 0, updatedAt: 0, __v: 0 })
      .sort({ title: 1 });

    if (requiredData.length == 0) {
      return res.status(404).send({ status: false, message: "Data not found" });
    }

    return res
      .status(200)
      .send({
        status: true,
        message: "Login Successfully",
        "Total Number of Books": requiredData.length,
        data: requiredData,
      });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//________________________________________________________________________________UpdateBook______________________________________________________
const updateBook = async function (req, res) {
  try {
    let requestBody = req.body;
    if (!requestBody) {
      return res
        .status(400)
        .send({ status: false, message: "Give me some data to update" });
    }

    if (req.book.isDeleted) {
      return res
        .status(400)
        .send({
          status: false,
          message: "This book is deleted, so you cannot update",
        });
    }

    let { title, author, price } = requestBody;

    const isUnique = await bookModel.findOne({ $or: [{ title: title }] });
    if (isUnique && isUnique._id != req.book._id) {
      return res
        .status(400)
        .send({ status: false, message: "Title already exists" });
    }

    let updatedBook = await bookModel.findByIdAndUpdate(
      req.book._id,
      requestBody,
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "Success", data: updatedBook });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//________________________________________________________________________deleteBook________________________________________________________________
const deleteBook = async function (req, res) {
  try {
    let bookData = await bookModel.findOneAndUpdate(
      { _id: req.BookId, isDeleted: false },
      { isDeleted: true, deletedAt: Date.now() },
      { new: true }
    );
    if (!bookData)
      return res
        .status(404)
        .send({ status: false, message: "Already deleted" });
    return res
      .status(200)
      .send({ status: true, message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createBook, getBook, updateBook, deleteBook };
