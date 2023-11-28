
import dbmodels from "../../models/index.js";


export const creatOrUpdateStock = async(bookQuantity, bookId)=>{
    try {
        let stockData =  await dbmodels.Stocks.findOne({ where : {book_id: parseInt(bookId)}});
        if(!stockData){
            await dbmodels.Stocks.create({quantity: bookQuantity, book_id: bookId});
        }else{
            await dbmodels.Stocks.update({quantity: bookQuantity}, { where: {book_id: parseInt(bookId)}});
        }
    } catch (error) {
        console.log(error);
        throw new Error('stock create update failed');
    }
}