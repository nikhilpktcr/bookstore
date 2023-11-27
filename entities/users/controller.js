
// Import the necessary function from userServices.j
import  { validationResult } from "express-validator"
import { findAllUsers, findOneUser, addUser, loginUser, updateUser, deleteUser } from './service.js';

export const getAll = async (req, res) => {
    try {
        let params = {
            offset: req.query.offset ? parseInt(req.query.offset) : 0,
            limit: req.query.limit ? parseInt(req.query.limit) : 10000
        }
        const userDetails = await findAllUsers(params);
        res.status(200).send(userDetails);
    } catch (error) {
        // Handling errors - sending a 404 status with an error message
        res.status(404).send({ error: 'Users details not found' });
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
        const userDetails = await findOneUser(params);
        res.status(200).send(userDetails);
    } catch (error) {
        // Handling errors - sending a 404 status with an error message
        res.status(404).send({ error: 'User details not found' });
    }
};

export const signUp = async(req, res)=>{
    try {
        const errors = await validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const userDetails = await addUser(req.body);
        res.status(201).send(userDetails);
    } catch (error) {
        // Handling errors - sending a 404 status with an error message
        res.status(404).send({ error: 'Users details not found' });
    }
};

export const logIn = async(req, res)=>{
    try {
        const errors = await validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const userDetails = await loginUser(req.body);
        res.status(201).send(userDetails);
    } catch (error) {
        // Handling errors - sending a 404 status with an error message
        res.status(404).send({ error: 'Users details not found' });
    }
};

export const update = async (req, res)=>{
    try {
        const userDetails = await updateUser(req.user.role, req.body, req.params.id);
        res.status(201).send(userDetails);
    } catch (error) {
        // Handling errors - sending a 404 status with an error message
        res.status(404).send({ error: 'Failed to update the user details' });
    }
};

export const remove = async (req, res)=>{
    try {
        const userDetails = await deleteUser(req.user.role,req.params.id);
        res.status(201).send(userDetails);
    } catch (error) {
        // Handling errors - sending a 404 status with an error message
        res.status(404).send({ error: 'Failed to delete the user details' });
    }
};



