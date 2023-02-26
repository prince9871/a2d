const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const bookController=require('../controllers/bookController')
//const mid=require('../middleware/mid')

router.post('/register',userController.createUser)//create user

router.post('/login',userController.login)//login user

// router.post('/books',mid.authentication,mid.authorisation,bookController.createBook)//create book
// router.get('/books',mid.authentication,bookController.getBook)//get books by query
// router.get('/books/:bookId',mid.authentication,bookController.getBookById)//get books by params
// router.put('/books/:bookId',mid.authentication, mid.authorisation,bookController.updateBook)//update books
// router.delete('/books/:bookId',mid.authentication, mid.authorisation, bookController.deleteBook)//delete book by id


module.exports=router
