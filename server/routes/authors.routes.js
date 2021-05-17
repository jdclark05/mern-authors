const AuthorsController = require('../controllers/authors.controller');

module.exports = (app) => {
    app.get('/form/allauthors', AuthorsController.getAllAuthors);
    app.get('/form/:id', AuthorsController.getOneAuthor);
    app.post('/form/authors', AuthorsController.createAuthor);
    app.put('/form/:id/update', AuthorsController.updateAuthor);
    app.delete("/form/:id/delete", AuthorsController.deleteAuthor);
}