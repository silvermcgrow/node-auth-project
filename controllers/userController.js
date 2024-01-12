const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports  = {
    //Validate re.body - done
    //crate mongoDB UserModel - done
    //do password encryption - done
    //save data to mongo - done
    // return response to the client - done
    registerUser: async (req, res) =>{
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try {
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({message: 'Success', data: response});
        } catch (err) {
            return res.status(500).json({message:'Error', err})
        }
    },

    // check user using email
    // compaire password
    // create jwd token
    // send response to client
    loginUser: async (req, res) =>{
        try {
            const user = await UserModel.findOne({email: req.body.email});

            if(!user){
                return res.status(401).json({message:'Auth Faield, Invalid username/password'});
            }
            const isPassEqual = await bcrypt.compare(req.body.password, user.password);
            if(!isPassEqual){
                return res.status(401).json({message:'Auth Faield, Invalid username/password'});
            }
            const tokenObject = {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }

            const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {expiresIn: '5h'});
            return res.status(200)
                        .json({jwtToken, tokenObject});
        } catch (err) {
            res.status(500).json({message:'Error', err})
        }
    },

    getUsers: async (req, res)=>{
        try {
            const users = await UserModel.find({},{password:0});
            return res.status(200)
                .json({message:'Success',data: users})
        } catch (err) {
            return res.status(500).json({message:'Error',err});
        }
    }   
}