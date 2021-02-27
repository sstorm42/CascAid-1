const language = require('express').Router();
const LanguageController = require('../controllers/impact-area-controller');

language.post('/seed', LanguageController.seed);
language.get('/seed', LanguageController.seed);
language.get('/global', LanguageController.getAllGlobal);
language.get('/user/:userId', LanguageController.getAllByUser);
language.get('/:languageId', LanguageController.getOne);

module.exports = language;
