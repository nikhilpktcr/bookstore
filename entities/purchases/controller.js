import {buyBook } from "./service.js"
import message from "./message.js";


export const purchase = async(req, res)=>{
    try {
        let bodyParams = {
            userId: parseInt(req.user.id),
            bookId:  parseInt(req.body.bookId),
            quantity:  parseInt(req.body.quantity),
        }
        const bookDetails = await buyBook(bodyParams);
        res.status(201).send({message:message.PURCHASE_SUCCESS, data:{bookDetails}});
    } catch (error) {
        if(error.message){
            res.status(404).send({ error: error.message });
        }else{
            // Handling errors - sending a 404 status with an error message
            res.status(404).send({ error: 'failed to add book' });
        }
     
    }
};