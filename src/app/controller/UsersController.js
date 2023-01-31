const User = require('../models/User')
const Deck = require('../models/Deck')

const Joi = require('joi')
const idSchema = Joi.object({
    userID: Joi.string().required().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
})

class UserController {
    // [GE T] /users
    async index(req, res, next) {
        const user  = await User.find({})
        return res.status(200).json(user)
    }

    async newUser(req, res, next) {
        const newUser = new User(req.value.body)

        await newUser.save()
        
        return res.status(201).json({user: newUser})
    }

    async newUserDeck(req, res, next) {
        const { userID } = req.params
        const newDeck = new Deck(req.body)
        const user = await User.findById(userID)
        newDeck.owner = user

        await newDeck.save()

        user.decks.push(newDeck._id)
        await user.save()
        
        res.status(201).json({deck: newDeck})
    }

    async getUser(req, res, next) {
        const validatorResult = idSchema.validate(req.value.params)
        console.log(`validator result: `, validatorResult)
        const { userID } = req.params
        const user = await User.findById(userID)
        return res.status(200).json({
            user: user
        })
    }

    async getUserDeck(req, res, next) {
        const { userID } = req.params
        const user = await User.findById(userID).populate('decks')
        return res.status(200).json({decks: user.decks})
    }

    async getDeck(req, res, next) {
        const deckID = req.value.params.deckID
        const deck = await Deck.findById(deckID)
        return res.status(200).json({deck: deck})
    }

    async updateUser(req, res, next) {
        const { userID } = req.params
        const newUser = req.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})
    }

    async replaceUser(req, res, next) {
        const { userID } = req.params
        const newUser = req.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})
    }
}

module.exports = new UserController