const HttpError = require('../utility/constant/http-error');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getOne, getAll, deleteOne } = require('../repository/user-repo');



const getUsers = async (req,res,next) => {
    let users;
    try{
        users =  await getAll();
    }
    catch(err){
        return next(new HttpError('something went wrong could not find Teachers.',500));
    }
    res.status(200).json({data:users.filter(tec=>tec.role !== "Principal")});
};

const deleteTeacher = async (req,res,next) => {
    try{
        await deleteOne({ _id: req.params.tid });
    }
    catch(err){
        return next(new HttpError('something went wrong could not find Users.',500));
    }
    res.status(200).json({message:'Deleted Place'});
};

const addTeacher = async (req,res,next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
       return next(new HttpError('Invalid input enter.please enter valid input.'));
    }
    const { name,email,password,role } = req.body;

    let existingUser;
    try{
        existingUser = await getOne({email:email});
    }
    catch(err){
        return next(new HttpError('Something went wrong.could not find Teacher',500));
    }
    if(existingUser){
      return next(new HttpError('Teacher is already registered.please add Teacher with other emailId',401));
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password,12);
    }catch(err){
        const error = new HttpError('Could not create Teacher,please try again.',500);
        return next(error)
    }
    
    
    const createdUser = new User({
        name,
        email,
        password:hashedPassword,
        role,
    });
    //console.log(createdUser);
    try{
        await createdUser.save();
    }
    catch(err){
        return next(new HttpError('add Teacher Failed.plese try again',500));
    }
    res.status(201).json({message:'Created Teacher Data is successfully'});
};

const login = async(req,res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return next(new HttpError('Invalid input enter.please enter valid input.',401));
    }
    
    const { email,password } = req.body;
    let identifiedUser;
    try{
        identifiedUser = await getOne({email:email});
    }
    catch(err){
        return next(new HttpError('something went wrong.login failed.'));
    }
    
    
    if(!identifiedUser){
        const error = new HttpError('User is not registered or enter wrong email,or sign up first.',401);
        return next(error);
    }

    let isValidPassword;
    try{
        isValidPassword = await bcrypt.compare(password,identifiedUser.password);
    }catch(err){
        return next(new HttpError('Password do not Match.',500))
    }
    

   //console.log(identifiedUser.email);
    if(!isValidPassword){
        const error = new HttpError('Password do not match.',401);
        return next(error);
    }
    let token;
    try{
        token = jwt.sign({userId:identifiedUser.id,email:identifiedUser.email, role: identifiedUser.role},
            process.env.JWT_KEY,
            {expiresIn:'1h'});
    }catch(err){
        return next(new HttpError('Login failed',500));
    }
    res.status(200).json({userId:identifiedUser.id,email:identifiedUser.email,role: identifiedUser.role,token:token});
};

exports.getUsers = getUsers;
exports.login = login;
exports.addTeacher = addTeacher;
exports.deleteTeacher = deleteTeacher;