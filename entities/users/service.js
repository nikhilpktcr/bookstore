import dotenv from 'dotenv';
import dbmodels from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
dotenv.config();


export const findAllUsers = async(queryParams) =>{
    try{
        const usersDetails = await dbmodels.Users.findAll({offset : queryParams.offset, limit: queryParams.limit});
        return usersDetails;
    }catch(error){
        console.log(error);
        throw new Error('Failed to fetch user details');
    }

}

export const findOneUser = async(pathParams)=>{
    const userDetails = await dbmodels.Users.findOne({where: {id: pathParams.id}});
    return userDetails;
};

export const addUser = async (bodyParams)=>{
    try{
        const isEmailAllReadyExist = await dbmodels.Users.findOne({where: {email: bodyParams.email}});
        if(isEmailAllReadyExist){
            throw new Error('user with same email exists')
        }
        let updatePassword = await bcrypt.hash(bodyParams.password, parseInt(process.env.SALT_ROUND));
        let createData = {
            user_name:bodyParams.userName,
            email:bodyParams.email,
            password:updatePassword
        }
        const user = await dbmodels.Users.create(createData);
        const {password, ...userDetails} = user.toJSON();
        return userDetails;
    }catch(error){
        console.log(error);
        throw new Error('user sign up failed');
    }
};


export const loginUser = async(bodyParams)=>{
    try {
        let userData =  await dbmodels.Users.findOne({where:{ email: bodyParams.email}});
        if (!userData) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(bodyParams.password, userData.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign
            (
                { id: userData?.id, user_name: userData?.user_name, email: userData?.email, role: userData.role},
                process.env.JWT_SECRET,
                {
                expiresIn: "3d",
                }
            );
        const {password, role,  ...userDetails} = userData.toJSON();
        userDetails.accessToken = token;
        return userDetails;
    } catch (error) {
        console.log(error);
        throw new Error('login failed');
    }
};


export const updateUser = async(role, bodyParams, userId)=>{
    let userData = '';
    try {
        userData =  await dbmodels.Users.findByPk(parseInt(userId));
        if(!userData){
            throw new Error("User not found")
        }
        let updatePassword = await bcrypt.hash(bodyParams.password, parseInt(process.env.SALT_ROUND));
        let updateData = {
            user_name: bodyParams.userName,
            email: bodyParams.email,
            password: updatePassword
        }
        if(role==='ADMIN'){
            updateData.role =  bodyParams.role;
        }
        await dbmodels.Users.update(updateData, { where: {id: userId}});
        userData =  await dbmodels.Users.findByPk(parseInt(userId));
        const {password, ...userDetails} = userData.toJSON();
        return userDetails
    } catch (error) {
        console.log(error);
        throw new Error('update failed');
    }
};

export const deleteUser = async(role, userId)=>{
    try {
        let userData =  await dbmodels.Users.findByPk(parseInt(userId));
        if(!userData){
            throw new Error("User not found")
        }
        if(role==='ADMIN'){
            await dbmodels.Users.destroy({where:{id: parseInt(userId)}});
        }else{
            let updateData = {
               is_deleted: true
            }
            await dbmodels.Users.update(updateData, { where: {id: parseInt(userId)}});
        }
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('delete failed');
    }
};
