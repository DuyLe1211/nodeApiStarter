const express = require('express')
const router = express.Router()
const deckController = require('../app/controller/DeckController')
const { validateBody, validateParam, schemas,  } = require('../helpers/routerHelper')

router.route('/:deckID')
    .get(validateParam(schemas.idSchema, 'deckID'), deckController.getDeck)
    .put(validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.newDeckSchema), deckController.replaceDeck)
    .patch(validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.deckOptionalSchema), deckController.updateDeck)
    .delete(validateParam(schemas.idSchema, 'deckID'), deckController.deleteDeck)

module.exports = router