import express from "express";
import { signUpValidation, logInValidation } from "../middleware/validator.js"
const userRouter = express.Router();
import  { 
    signUp,
    getAll,
    remove,
    update,
    getOne,
    logIn
} from "../entities/users/controller.js";


userRouter.get('/admin/getAll', getAll);
userRouter.get('/admin/getOne/:id', getOne);
userRouter.post('/signUp', signUpValidation, signUp);
userRouter.post('/logIn', logInValidation, logIn);
userRouter.put('/admin/update/:id', update);
userRouter.delete('/admin/remove/:id', remove);


export default userRouter;




