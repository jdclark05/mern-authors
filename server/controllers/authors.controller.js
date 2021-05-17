const Authors = require('../models/authors.model');


const getAllAuthors = (req, res) => {
    Authors.find({})
        .then(allAuthors => res.json({allAuthors: allAuthors}))
        .catch((err) => res.json({message: "Error: Search request not fulfilled", error:err}))
}

const getOneAuthor = (req, res) => {
    Authors.find({_id: req.params.id})
        .then(newAuthor => res.json({authors: newAuthor}))
        .catch((err) => res.json({message: "Error: Search request not fulfilled", error:err}))
}


const createAuthor = (req, res) => {
    Authors.create(req.body)
        .then((newAuthor) => res.json({Author: newAuthor}))
        .catch(err => res.json({message: "Error: Create request not fulfilled", error:err}))
}

const updateAuthor = (req, res) => {
    Authors.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updateAuthor => res.json({Author: updateAuthor}))
        .catch((err) => res.json({message: "Error: Update request not fulfilled", error:err}))
}

const deleteAuthor = (req, res) => {
    Authors.findByIdAndDelete({_id: req.params.id })
        .then(result => req.json({result: result}))
        .catch(err => res.json({message: "Error: Delete request not fulfilled", error:err}))
}

module.exports = { getAllAuthors, getOneAuthor, createAuthor, updateAuthor, deleteAuthor };