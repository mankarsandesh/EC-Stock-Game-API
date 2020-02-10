const express = require('express');
const gameRouter = express.Router();

const gameController = require('../controller/game_controller');

// Get Game provider UUID wise
gameRouter.post('/getGames', gameController.AllGameByProviderID);

module.exports = gameRouter;