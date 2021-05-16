const endorsement = require('express').Router();
const EndorsementController = require('../controllers/endorsement-controller');
// const EndorsementValidator = require('../middlewares/validators/endorsement-validator');
const { allowIfLoggedIn } = require('../middlewares/access-control');

endorsement.post('/endorse', allowIfLoggedIn, EndorsementController.endorseUser);
endorsement.post('/cancel-endorse', allowIfLoggedIn, EndorsementController.cancelEndorseUser);

endorsement.get('/endorsers/:userId', allowIfLoggedIn, EndorsementController.getAllEndorsers);
endorsement.get('/endorsees/:userId', allowIfLoggedIn, EndorsementController.getAllEndorsees);
endorsement.get('/:endorserId/:endorseeId', allowIfLoggedIn, EndorsementController.CheckIfEndorses);

module.exports = endorsement;
