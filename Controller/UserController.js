require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../model/user')
var jwt = require('jsonwebtoken');


exports.User_contact_create = async function (req, res, next) {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.address) {
            throw new Error("Please the data")
        }
        if (!req.body.createdAt) {
            req.body.createdAt = Date.now()
        }
        if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const ContactUser = await User.create(req.body)
        const Jwt_User = jwt.sign({ id: ContactUser._id },process.env.SECRET_USER )
        res.status(201).json({
            status: "sucess",
            message: "Contact create",
            data: ContactUser,
            Jwt_User
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "Contact not create",
        })
    }

}

exports.User_Contact_get = async function (req, res, next) {
    try {
        const ContactUser_get = await User.find()
        res.status(201).json({
            status: "sucess",
            message: "Contact Find",
            data: ContactUser_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "Contact not create",
        })
    }
}

exports.User_Contact_Update = async function (req, res, next) {
    // /UserUpdate?id=lkj8778oj74r7tgy55e
    try {
        id = req.params.id
        if (req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        } else if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const ContactUser_get = await User.findByIdAndUpdate(id, req.body)
        console.log(ContactUser_get);
        res.status(201).json({
            status: "sucess",
            message: "Contact Update",
            data: ContactUser_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "Contact not Update",
        })
    }
}

exports.User_Contact_Delete = async function (req, res, next) {
    // /UserUpdate?id=lkj8778oj74r7tgy55e
    try {
        id = req.params.id
        await User.findByIdAndDelete(id)
        res.status(201).json({
            status: "sucess",
            message: "Contact Delet",
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "Contact not delete",
        })
    }
}

exports.User_Contact_sequre = async function (req, res, next) {
    try {
        let User_Contact = req.headers.authorization
        if (!User_Contact) {
            throw new Error("TOken not found")
        }
        const Jwt_token = jwt.verify(User_Contact,process.env.SECRET_USER);
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: "Contact not sequre",
        })
    }
}