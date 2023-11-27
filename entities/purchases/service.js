import dbmodels from "../../models/index.js"
import { checkPaymentStatus } from "../payments/service.js";


export const buyBook = async(bodyParams)=>{
    try {
        let stockDetails = await dbmodels.Stocks.findOne({where:{book_id: parseInt(bodyParams.bookId)}});
        const stockQuantity = parseInt(stockDetails.quantity);
        if(stockQuantity=== 0){
            throw new Error("Book out of stock");
        }
        const buyQuantity = parseInt(bodyParams.quantity);
        if(stockQuantity >= buyQuantity){
            let createData = {
                user_id: parseInt(bodyParams.userId),
                book_id: parseInt(bodyParams.bookId),
                stock_id: parseInt(stockDetails.id),
                quantity: buyQuantity
            }
            let purchaseDetails = await dbmodels.Purchases.create(createData);
            let updateQuantity = parseInt(stockQuantity - buyQuantity);
            await dbmodels.Stocks.update({quantity: updateQuantity}, {where:{book_id: createData.book_id}});
            let paymentStatus = await checkPaymentStatus({purchaseId: purchaseDetails.id, paymentDetails: bodyParams.paymentDetails})
            await dbmodels.Purchases.update({payment_status:paymentStatus}, {where:{ id: purchaseDetails.id}});
            return true;
        }else{
            throw new Error("Buying quantity excceeded");
        }
    } catch (error) {
        if(error.message){
            throw new Error(error.message);
        }
        throw new Error("Purchase failed");
    }

}