import dotenv from 'dotenv';
import { Op } from "sequelize"
import dbmodels from "../../models/index.js";
import { creatOrUpdateStock } from "../stocks/service.js"
dotenv.config();


export const findAllBooks = async(queryParams) =>{
    try{
        let whereClause ='';
        let replacements = {};
        let paginationClause = '';
        if (queryParams.search) {
            whereClause = `WHERE B.name LIKE :search OR B.author LIKE :search`;
            replacements = { 
                search: `%${queryParams.search}%`
            };
        }
        if (queryParams.limit && queryParams.offset) {
            paginationClause = `LIMIT :limit OFFSET :offset`;
            replacements.limit = parseInt(queryParams.limit);
            replacements.offset = parseInt(queryParams.offset);
        }
        let query = `SELECT 
                            B.id as "bookId",
                            B.name as "name",
                            B.author as "author", 
                            B.price as "price", 
                            S.id as "stockId",
                            S.quantity as "quantity"
                        FROM books B
                        LEFT JOIN stocks S on S.book_id = B.id
                        ${whereClause}
                        ${paginationClause}`;

        let options = {
            type:dbmodels.sequelize.QueryTypes.SELECT,
            replacements: replacements
        }
        let result = await dbmodels.sequelize.query(query, options);
        return result;
    }catch(error){
        console.log(error)
        if(error.message){
            throw new Error(error.message);
        }else{
            // Handling errors - sending a 404 status with an error message
            throw new Error('failed to fetch books');
        }
    }

}

export const findOneBook = async(pathParams)=>{
    const bookDetails = await dbmodels.Books.findOne({where: {id: pathParams.id}});
    return bookDetails;
};

export const addBook = async (bodyParams)=>{
    try{
        const isBookExist = await dbmodels.Books.findOne({ where: {name: bodyParams.name, author: bodyParams.author} });
        if(isBookExist){
            throw new Error('book already exists')
        }
        let createData = {
            name:bodyParams.name,
            author:bodyParams.author,
            price:bodyParams.price,
        }
        if(bodyParams.coverUrl){
            createData.cover = bodyParams.coverUrl
        }
        const bookData = await dbmodels.Books.create(createData);
        if(bodyParams.quantity){
            await creatOrUpdateStock(parseInt(bodyParams.quantity), parseInt(bookData.id));
        }
        let result = await getBookDetails(bookData.id);
        return result;
    }catch(error){
        console.log(error)
        if(error.message){
            throw new Error(error.message);
        }else{
            throw new Error('failed to add book');
        }
    }
};


export const updateBook = async(bodyParams, bookId)=>{
    let bookData = '';
    try {
        bookData =  await dbmodels.Books.findByPk(parseInt(bookId));
        if(!bookData){
            throw new Error("Book not found")
        }
        const isBookExist = await dbmodels.Books.findOne({ where: { id: { [Op.not]: parseInt(bookId) }, name: bodyParams.name, author: bodyParams.author} });
        if(isBookExist){
            throw new Error('book already exists')
        }
        let updateData = {
            name: bodyParams.name,
            author: bodyParams.author,
            price: bodyParams.price
        }
        if(bodyParams.coverUrl){
            updateData.cover = bodyParams.coverUrl;
        }
        await dbmodels.Books.update(updateData, { where: {id: parseInt(bookId)}});
        if(bodyParams.quantity){
            await creatOrUpdateStock(parseInt(bodyParams.quantity), parseInt(bookId));
        }
        let result = await getBookDetails(parseInt(bookId));
        return result;
    } catch (error) {
        console.log(error)
        if(error.message){
            throw new Error(error.message);
        }else{
            throw new Error('update failed');
        }
    }
};

export const deleteBook = async(bookId)=>{
    try {
        let bookData =  await dbmodels.Books.findByPk(parseInt(bookId));
        if(!bookData){
            throw new Error("Book not found")
        }
        await dbmodels.Books.destroy({where:{id: parseInt(bookId)}});
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('delete failed');
    }
};


export const getBookDetails  = async(bookId) =>{
    let query = `SELECT 
                        B.id as "bookId",
                        B.name as "name",
                        B.author as "author", 
                        B.price as "price", 
                        S.id as "stockId",
                        S.quantity as "quantity"
                        FROM books B
                    LEFT JOIN stocks S on S.book_id = B.id
                    WHERE B.id = :id`;
    let options = {
        type:dbmodels.sequelize.QueryTypes.SELECT,
        replacements: {
            id: bookId
        }
    }
    let result = await dbmodels.sequelize.query(query, options);
    return (result && result.length > 0) ? result[0]: null;
}
