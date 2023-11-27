import express from "express";
const roleRouter = express.Router();
import  { 
    add,
    getAll,
    getOne,
    update,
    remove
} from "../entities/books/controller.js";


//admin routes only
roleRouter.get('/admin/getAll', getAll);
roleRouter.get('/admin/getOne/:id', getOne);
roleRouter.post('/admin/add', add);
roleRouter.put('/admin/update/:id', update);
roleRouter.delete('/admin/remove/:id', remove);

export default roleRouter;