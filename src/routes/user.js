const express = require('express')
const { required } = require('joi')
const router = require('express-promise-router')()
const userController = require('../app/controller/UsersController')
const { validateBody, validateParam, schemas,  } = require('../helpers/routerHelper')

router.route('/:userID/decks')
    .post(userController.newUserDeck)
    .get(userController.getUserDeck)

router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID'), userController.getUser)
    .put(userController.replaceUser)
    .patch(userController.updateUser)

router.route('/')
    .get(userController.index)
    .post(validateBody(schemas.userSchema), userController.newUser)

module.exports = router