const User = require('../models/User')
const Deck = require('../models/Deck')

class DeckController {
    async getDeck(req, res) {
        const deck = await Deck.findById(req.value.params.deckID)
        return res.status(200).json({deck: deck})
    }

    async newDeck(req, res) {

    }

    async replaceDeck(req, res) {
        const deckID = req.value.params.deckID
        const newDeck = req.value.body
        const result = await Deck.findByIdAndUpdate(deckID, newDeck)
        return res.status(200).json({success: true})
    }

    async updateDeck(req, res) {
        const deckID = req.value.params.deckID
        const newDeck = req.value.body
        const result = await Deck.findByIdAndUpdate(deckID, newDeck)
        return res.status(200).json({success: true})
    }

    async deleteDeck(req, res) {
        const deckID = req.value.params.deckID
        const deck = await Deck.findById(deckID)
        const ownerID = deck.owner
        const owner = await User.findById(ownerID)
        await Deck.findByIdAndDelete(deckID)
        owner.decks.pull(deck)
        await owner.save()
        return res.status(200).json({success: true})
    }
}

module.exports = new DeckController