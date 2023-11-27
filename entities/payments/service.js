import dbmodels from "../../models/index.js"

 export const checkPaymentStatus = async(paymentDetails)=>{
        try {
            // for checking payment activity and status of the payment
            //for now sucess only
            let transactionId= 'xxxx12222131' // get the result from payment gateways and update the transactionId
            let result = transactionId ? true : false; 
            if (!result) {
                throw new Error('Payment failed');
            }
            await createPayment(paymentDetails.purchaseId, transactionId)
            return result
        } catch (error) {
            throw new Error("Payment gateway error")
        }
 }


 export const createPayment = async(purchaseId, transactionId)=>{
    try {
        let createData = {
            purchase_id:purchaseId,
            payment_details: transactionId
        }
        await dbmodels.Payments.create(createData);
        return true;
    } catch (error) {
        throw new Error("Failed to create payment status")
    }
 }



