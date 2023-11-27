import express from "express";
const purchaseRouter = express.Router();
import  { purchase } from "../entities/purchases/controller.js";

purchaseRouter.post('/buy', purchase);
// purchaseRouter.post('/admin/history/:id', getOne);


export default purchaseRouter