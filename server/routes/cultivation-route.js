const cultivation = require('express').Router();
const CultivationController = require('../controllers/cultivation-controller');
// const CultivationValidator = require('../middlewares/validators/cultivation-validator');
const { allowIfLoggedIn } = require('../middlewares/access-control');

cultivation.post('/', CultivationController.createOne);
cultivation.put('/:cultivationId', CultivationController.updateOne);
cultivation.get('/user/:userId', CultivationController.getAll);
cultivation.get('/:cultivationId', CultivationController.getOne);
cultivation.put('/:cultivationId/add/user', CultivationController.addUserToCultivationList);
cultivation.put('/:cultivationId/remove/user', CultivationController.removeUserFromCultivationList);
cultivation.delete('/:cultivationId', CultivationController.deleteOne);

module.exports = cultivation;
