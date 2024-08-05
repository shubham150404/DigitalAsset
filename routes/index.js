require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')
const DigitalAsset = require('../model/DigitalAsset')
const DigitalAsset_controller = require('../Controller/DigitalAssetController')
const User_Controllers = require('../Controller/UserController')
var jwt = require('jsonwebtoken');



/* GET home page. */
router.post('/User_create',User_Controllers.User_contact_create);

router.get('/UserGet',User_Controllers.User_Contact_sequre,User_Controllers.User_Contact_get);

router.put('/UserUpdate/:id',User_Controllers.User_Contact_sequre,User_Controllers.User_Contact_Update);

router.delete('/UserDelete/:id',User_Controllers.User_Contact_sequre,User_Controllers.User_Contact_Delete);


// DigitalAsset
router.post('/DigitalAsset_create',DigitalAsset_controller.DigitalAsset_create);

router.get('/DigitalAssetGet',DigitalAsset_controller.DigitalAsset_sequre,DigitalAsset_controller.DigitalAsset_get);

router.put('/DigitalAssetUpdate/:id',DigitalAsset_controller.DigitalAsset_Update,DigitalAsset_controller.DigitalAsset_Update);

router.delete('/DigitalAssetDelete/:id',DigitalAsset_controller.DigitalAsset_Delete,DigitalAsset_controller.DigitalAsset_Delete);

module.exports = router;
