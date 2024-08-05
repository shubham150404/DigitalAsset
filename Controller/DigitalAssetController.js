require('dotenv').config();
const mongoose = require('mongoose');
const DigitalAsset = require('../model/DigitalAsset')
var jwt = require('jsonwebtoken');


exports.DigitalAsset_create = async function (req, res, next) {
    try {
        if (!req.body.name || !req.body.description || !req.body.type || !req.body.url || !req.body.uploadedBy || !req.body.metadata) {
            throw new Error("Please Fill the data")
        }
        if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const DigitalAsset_data = await DigitalAsset.create(req.body)
        const Jwt_DigitalAsset = jwt.sign({ id: DigitalAsset_data._id },process.env.SECRET_DIGITALASSET)
        res.status(201).json({
            status: "sucess",
            message: "DigitalAsset create",
            data: DigitalAsset_data,
            Jwt_DigitalAsset
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }

}

exports.DigitalAsset_get = async function (req, res, next) {
    try {
        const DigitalAsset_get = await DigitalAsset.find().populate('uploadedBy')
        res.status(201).json({
            status: "sucess",
            message: "DigitalAsset Find",
            data: DigitalAsset_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.DigitalAsset_Update = async function (req, res, next) {
    // /UserUpdate?id=lkj8778oj74r7tgy55e
    try {
        id = req.params.id
        if (req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        } else if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const DigitalAsset_UPdate = await DigitalAsset.findByIdAndUpdate(id, req.body)
        console.log(DigitalAsset_UPdate);
        res.status(201).json({
            status: "sucess",
            message: "DigitalAsset Update",
            data: DigitalAsset_UPdate,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.DigitalAsset_Delete = async function (req, res, next) {
    // /UserUpdate?id=lkj8778oj74r7tgy55e
    try {
        id = req.params.id
        await DigitalAsset.findByIdAndDelete(id)
        res.status(201).json({
            status: "sucess",
            message: "DigitalAsset Delete",
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.DigitalAsset_sequre = async function (req, res, next) {
    try {
        let DigitalAsset_token = req.headers.authorization
        if (!DigitalAsset_token) {
            throw new Error("TOken not found")
        }
        const Jwt_token = jwt.verify(DigitalAsset_token,process.env.SECRET_DIGITALASSET);
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message
        })
    }
}