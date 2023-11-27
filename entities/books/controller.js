
// Import the necessary function from book services.js
import { findAllBooks, findOneBook, addBook, updateBook, deleteBook } from './service.js';
import message from './message.js';


export const getAll = async (req, res) => {
    try {
        let params = {
            offset: req.query.offset ? parseInt(req.query.offset) : 0,
            limit: req.query.limit ? parseInt(req.query.limit) : 10000,
            order: req.query.order?  req.query.order: 'ASC',
            search: req.query.search ? req.query.search: ''
        }
        const booksDetails = await findAllBooks(params);
        res.status(200).send({message:message.BOOK_LIST_FETCH_SUCCESS, data:{ booksDetails }});
    } catch (error) {
        if(error.message){
            res.status(404).send({ error: error.message });
        }else{
            if(error.message){
                res.status(404).send({ error: error.message });
            }else{
                // Handling errors - sending a 404 status with an error message
                res.status(404).send({ error: message.BOOK_LIST_FETCH_FAILED });
            }
        }
    }
};

export const getOne = async (req, res) => {
    try {
        let params = '';
        if(req.params.id){
            params = {
                id: parseInt(req.params.id)
            }
        }
        const bookDetails = await findOneBook(params);
        res.status(200).send({message:message.BOOK_FETCH_SUCCESS, data:{ bookDetails }});
    } catch (error) {
        if(error.message){
            res.status(404).send({ error: error.message });
        }else{
            // Handling errors - sending a 404 status with an error message
            res.status(404).send({ error: message.BOOK_FETCH_FAILED});
        }
    }
};

export const add = async(req, res)=>{
    try {
        const bookDetails = await addBook(req.body);
        res.status(201).send({message:message.BOOK_ADD_SUCCESS, data:{ bookDetails }});
    } catch (error) {
        if(error.message){
            res.status(404).send({ error: error.message });
        }else{
            // Handling errors - sending a 404 status with an error message
            res.status(404).send({ error: message.BOOK_ADD_FAILED});
        }
    }
};


export const update = async (req, res)=>{
    try {
        const bookDetails = await updateBook(req.body, req.params.id);
        res.status(201).send({message:message.BOOK_UPDATE_SUCCESS, data:{ bookDetails }});
    } catch (error) {
        if(error.message){
            res.status(404).send({ error: error.message });
        }else{
            // Handling errors - sending a 404 status with an error message
            res.status(404).send({ error: message.BOOK_UPDATE_FAILED });
        }
    }
};

export const remove = async (req, res)=>{
    try {
        const bookDetails = await deleteBook(req.params.id);
        res.status(201).send({message:message.BOOK_DELETE_SUCCESS, data:{ bookDetails }});
    } catch (error) {
        if(error.message){
            res.status(404).send({ error: error.message });
        }else{
            // Handling errors - sending a 404 status with an error message
            res.status(404).send({ error: message.BOOK_DELETE_FAILED});
        }
    }
};



