import express from "express";

const bookRouter = express.Router();
import  { 
    add,
    getAll,
    getOne,
    update,
    remove
} from "../entities/books/controller.js";

//common routes
bookRouter.get('/getAll', getAll);
bookRouter.get('/getOne/:id', getOne);
//admin routes only
bookRouter.post('/admin/add', add);
bookRouter.put('/admin/update/:id', update);
bookRouter.delete('/admin/remove/:id', remove);

export default bookRouter;