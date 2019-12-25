const express = require('express');
const router = express.Router();
const BooksServices = require('../../services/books');

const bookServices = new BooksServices();

router.get('/', async function(req, res, next){
  try {
    const { body : token } = req
        const books = await bookServices.getAllBooks(token);

        res.status(200).json({
            data: books,
            message: 'product listed'
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:bookId', async function(req, res, next){
  const bookId = req.param('bookId');
  try {
    const book = await bookServices.getOneBook(bookId);
    res.status(200).json({
      data: book,
      message: 'book info'
    });
  } catch (error) {
    res.status(500).json({
      data :"",
      message:"Error al buscar libro"
    });
    
  }
})

router.post('/',async function(req, res, next){
  const { body: data } = req;
  try {
    const book = await bookServices.registerBook(data);
    res.status(201).json({
      message: 'Libro registrado'
    });
  } catch (error) {
    res.status(500).json({
      data :"",
      message:"Error al buscar libro"
    });
  }
});

router.put('/:bookId', function(req, res, next){
  res.send({ send: "put update a book"});
});

router.delete('/:bookId', function(req, res, next){
  res.send({send:"delete a book"});
});


module.exports = router;
