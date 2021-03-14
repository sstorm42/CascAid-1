const skill = require('express').Router();
const SkillController = require('../controllers/skill-controller');

skill.post('/seed', SkillController.seed);
skill.get('/seed', SkillController.seed);
skill.get('/global', SkillController.getAllGlobal);
skill.get('/user/:userId', SkillController.getAllByUser);
skill.get('/:skillId', SkillController.getOne);
module.exports = skill;
